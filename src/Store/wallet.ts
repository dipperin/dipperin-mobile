import BIP39 from 'bip39'
import { observable, reaction, computed, action } from 'mobx'
import { Accounts, AccountObject } from '@dipperin/dipperin.js'
import { getRandom, encryptionPassword } from 'Global/utils'
// import settings from '@/utils/settings'
import {
  getWallet,
  insertWallet,
  updateErrTimes,
  updateLockTime,
  updateActiveId,
  setStorage,
  getStorage,
} from 'Db';

import RootStore from './root';
import WalletModel, { WalletObj } from 'Models/wallet';
import {
  STORAGE_KEYS,
  DEFAULT_ERR_TIMES,
  DEFAULT_LOCK_TIME,
  LOCKTIMES,
  FIRST_ACCOUNT_ID,
} from 'Global/constants';
import Encryptor from 'Global/encryptor';
export default class WalletStore {
  private _store: RootStore;
  private _mnemonic?: string; // Mnemonic

  @observable
  private _currentWallet?: WalletModel; // current wallet

  @observable
  private _hdAccount?: AccountObject; // Seed

  destroyMnemonic?: () => Promise<undefined | string>;

  constructor(store: RootStore) {
    this._store = store;
    reaction(
      () => this.unlockErrTimes,
      errTimes => {
        if (this._currentWallet) {
          updateErrTimes(this._currentWallet.walletId, errTimes);
          this.checkUnlockErrTimes(errTimes);
        }
      },
    );

    reaction(
      () => this.lockTime,
      lockTime => {
        if (this._currentWallet) {
          updateLockTime(this._currentWallet.walletId, lockTime);
        }
      },
    );
  }

  @computed
  get isHaveWallet() {
    return !!this._currentWallet;
  }

  @computed
  get mnemonic() {
    return this._mnemonic;
  }

  @computed
  get walletId(): number {
    return this._currentWallet ? this._currentWallet.walletId : 0;
  }

  @computed
  get isUnlock(): boolean {
    return !!this._hdAccount;
  }

  @computed
  get lockTime(): string {
    return this._currentWallet
      ? this._currentWallet!.lockTime
      : DEFAULT_LOCK_TIME;
  }

  @computed
  get unlockErrTimes(): number {
    return this._currentWallet
      ? this._currentWallet!.unlockErrTimes
      : DEFAULT_ERR_TIMES;
  }

  @computed
  get showLock(): boolean {
    return this._currentWallet ? this._currentWallet.showLock : false;
  }

  @computed
  get hdAccount() {
    return this._hdAccount;
  }

  @computed
  get activeAccountId(): string {
    return this._currentWallet ? this._currentWallet.activeAccountId : '1';
  }

  set activeAccountId(id: string) {
    if (this._currentWallet) {
      this._currentWallet.activeAccountId = id;
      updateActiveId(this.walletId, id);
    }
  }

  @action
  setCurrentWallet(wallet: WalletModel) {
    this._currentWallet = wallet
  }

  @action
  setMnemonic(mnemonic: string) {
    this._mnemonic = mnemonic
  }

  @action
  setHdAccount(account: AccountObject | undefined) {
    this._hdAccount = account
  }

  // get isConnecting() {
  //   return this._isConnecting
  // }

  /**
   * Toggle wallet lock
   * @param isLock
   */
  toggleLock(isLock: boolean): void {
    this._currentWallet!.showLock = isLock;
  }

  /**
   * Get private key by path from this seed
   *
   * @param path
   */
  getPrivateKeyByPath(cpath: string): string {
    return this.getAccountByPath(cpath).privateKey;
  }

  /**
   * Get derive account by path
   * @param path Derive path
   */
  getAccountByPath(cpath: string) {
    return this._hdAccount!.derivePath(cpath);
  }

  /**
   * Unlock wallet
   * @param password
   */
  async unlockWallet(password: string): Promise<boolean> {
    const account = await this.getHdAccount(password);
    if (account) {
      this.setHdAccount(account)
      return true;
    }
    return false;
  }

  /**
   * Check Password
   * @param password
   */
  async checkPassword(password: string): Promise<boolean> {
    const account = await this.getHdAccount(password);
    return account ? true : false;
  }

  /**
   * Create a new Wallet
   *
   * @param password wallet decrypt password
   */
  create = async (
    password: string,
    mnemonic?: string,
  ): Promise<Error | void> => {
    try {
      if (!mnemonic) {
        // If not input a mnemonic, generate a new mnemonic and save
        this.destroyMnemonic = await this.createDestroyMnemonic(password);
      } else {
        await this.initWallet(password, mnemonic);
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  /**
   * Save wallet to db
   */
  save() {
    this.saveWallet();
  }

  /**
   * Load wallet from data store
   */

  async load(): Promise<boolean> {
    const walletId =
      ((await getStorage(STORAGE_KEYS.WALLET_ID)) as number) || 1;
    const walletObj = await getWallet(walletId);
    if (!walletObj) {
      // FIXME: When the wallet cannot be successfully loaded, an error message should pop up.
      return false;
    }
    try {
      this.setCurrentWallet(new WalletModel(walletObj))
      return true;
    } catch (err) {
      return false;
    }
  }

  async changePassword(newPassword: string): Promise<string | undefined> {
    try {
      if (!this._currentWallet) {
        return 'Wallet does not exist!';
      }
      // Try to parse mnemonic to seed, if fail, return error
      // save encrypt seed, an then clear password and mnemonic
      const encryptPassword = encryptionPassword(newPassword)
      setStorage(STORAGE_KEYS.PASSWORD, encryptPassword)
      const encryptSeed = await Encryptor.encrypt(newPassword, this._hdAccount!.seed)
      const { walletId, activeAccountId } = this._currentWallet!
      const walletObj: WalletObj = {
        walletId,
        activeAccountId,
        encryptSeed,
        unlockErrTimes: DEFAULT_ERR_TIMES,
        lockTime: DEFAULT_LOCK_TIME,
      };
      this.setCurrentWallet(new WalletModel(walletObj))
      this.saveWallet(); // save wallet in storage
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  /**
   * Clear all data
   */
  @action
  clear() {
    this._currentWallet = undefined;
  }

  /**
   * Save wallet to db and save wallet id to setting
   */
  private saveWallet(): void {
    // save current wallet id in storage
    setStorage(STORAGE_KEYS.WALLET_ID, this._currentWallet!.walletId);
    insertWallet(this._currentWallet!.toJS());
  }

  /**
   * Create Destroy mnemonic
   * @param password
   */
  private async createDestroyMnemonic(
    password: string,
  ): Promise<() => Promise<undefined | string>> {
    const random = await getRandom(16);
    const mnemonic = BIP39.entropyToMnemonic(random.toString('hex'));
    this.setMnemonic(mnemonic)
    return async () => {
      try {
        // Destroy mnemonic and init the wallet
        await this.initWallet(password, mnemonic);
        this.setMnemonic('')
      } catch (err) {
        console.log(err);
        return err;
      }
    };
  }

  /**
   * Init the new wallet
   * @param password
   * @param mnemonic
   */
  private initWallet = async (
    password: string,
    mnemonic: string,
  ): Promise<void> => {
    // init wallet id
    const walletId = new Date().valueOf();
    // Try to parse mnemonic to seed, if fail, return error
    const seed = `0x${BIP39.mnemonicToSeedHex(mnemonic)}`;
    const hdAccount = Accounts.create(seed);
    // save encrypt seed, an then clear password and mnemonic
    const encryptSeed = await Encryptor.encrypt(password, seed);
    const walletObj: WalletObj = {
      walletId,
      activeAccountId: FIRST_ACCOUNT_ID,
      encryptSeed,
      unlockErrTimes: DEFAULT_ERR_TIMES,
      lockTime: DEFAULT_LOCK_TIME,
    };
    this.setCurrentWallet(new WalletModel(walletObj))
    this.setHdAccount(hdAccount)
    this.saveWallet(); // save wallet in storage
    // init account
    await this._store.account.initAccount();
  };

  /**
   * Check if the number of unlock errors exceeds the limit
   * @param errTimes
   */
  @action
  private checkUnlockErrTimes(errTimes: number): void {
    if (errTimes >= LOCKTIMES) {
      const nowDateString = String(new Date().valueOf());
      updateLockTime(this._currentWallet!.walletId, nowDateString);
      this._currentWallet!.lockTime = nowDateString;
      this._currentWallet!.showLock = true;
      this._currentWallet!.unlockErrTimes = 0;
      updateErrTimes(this._currentWallet!.walletId, 0);
    }
  }

  /**
   * unlock wallet / check password
   * get hd account
   */
  private async getHdAccount(password: string): Promise<undefined | AccountObject> {
    if (!this._currentWallet || !this._currentWallet.encryptSeed) {
      return;
    }

    try {
      const startTime = Date.now();
      const seed = await Encryptor.decrypt(password, this._currentWallet.encryptSeed)
      const account = Accounts.create(seed);
      this._currentWallet.unlockErrTimes = DEFAULT_ERR_TIMES;
      console.log('decrypt use:', Date.now() - startTime);
      return account;
    } catch (_) {
      const preErrTimes = this._currentWallet.unlockErrTimes;
      let errTimes = preErrTimes ? preErrTimes : DEFAULT_ERR_TIMES;
      this._currentWallet.unlockErrTimes = ++errTimes;
      return;
    }
  }
}
