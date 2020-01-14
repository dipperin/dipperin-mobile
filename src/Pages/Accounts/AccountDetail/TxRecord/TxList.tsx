import { FlatList } from "react-native"
import React from "react"
import { observer } from "mobx-react"
import { action, observable, runInAction } from "mobx"
import Toast from "Components/Toast"

import TransactionModel from "Models/transaction"
import { getTxList } from "Server"
import { transferTxfromNode, TxRes } from "../config"
import { I18nAccountType } from 'I18n/config'


import TxItem from "./TxItem"

interface Props {
    transactionsFromLocal?: TransactionModel[]
    activeAccountaddress: string
    labels: I18nAccountType

}
interface Params {
    address: string
    page: number
    per_page: number
}

@observer
class TxList extends React.Component<Props>{
    @observable currentPage: number = 1
    @observable transactionsFromNode: TransactionModel[] | [] = []

    componentDidMount() {
        this.refresh()
    }

    @action
    getMoreTransaction = () => {
        const { activeAccountaddress } = this.props
        const params = {
            address: activeAccountaddress,
            page: this.currentPage,
            per_page: 10
        }
        this.getTransctionsfromNode(params)
    }
    @action
    refresh = () => {
        const { activeAccountaddress } = this.props
        const params = {
            address: activeAccountaddress,
            page: 1,
            per_page: 10
        }
        this.getTransctionsfromNode(params)
    }
    @action
    getTransctionsfromNode = async (params: Params) => {
        Toast.loading()
        const res = await getTxList(params) as TxRes
        Toast.hide()
        if (res?.success && res.tx_list?.length > 0) {
            const txs = res.tx_list.map(item => {
                return transferTxfromNode(item)
            })
            this.currentPage++
            if (params.page === 1) {
                runInAction(() => {
                    this.transactionsFromNode = txs
                })
            } else {
                runInAction(() => {
                    this.transactionsFromNode = { ...this.transactionsFromNode, ...txs }
                })
            }
        }
    }

    render() {
        const { transactionsFromLocal, activeAccountaddress, labels } = this.props
        return (
            <FlatList
                refreshing={false}
                onRefresh={this.refresh}
                keyExtractor={(item: TransactionModel, index: number) => item.from + index}
                onEndReached={this.getMoreTransaction}
                onEndReachedThreshold={0.1}
                data={this.transactionsFromNode}
                extraData={transactionsFromLocal}
                renderItem={({ item }) => <TxItem
                    transaction={item}
                    activeAccountaddress={activeAccountaddress}
                    labels={labels}

                />}

            />
        )
    }
}


export default TxList