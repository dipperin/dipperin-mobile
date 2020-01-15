import { FlatList } from "react-native"
import React from "react"
import { observer } from "mobx-react"
import { action, observable, runInAction } from "mobx"
import { Toast } from "Components/PopupWindow"

import TransactionModel from "Models/transaction"
import { getTxList } from "Server"
import { transferTxfromNode, TxRes } from "../config"
import { I18nAccountType } from 'I18n/config'


import TxItem from "./TxItem"

interface Props {
    transactionsFromLocal?: TransactionModel[]
    activeAccountaddress: string
    labels: I18nAccountType
    keyIndex: Key

}
type Key = 'all' | 'sent' | 'received' | 'failed'
interface Params {
    address: string
    page: number
    per_page: number
}

@observer
class TxList extends React.Component<Props>{
    @observable currentPage: number = 1
    @observable transactionsFromNode: TransactionModel[]
    constructor(props: Props) {
        super(props)
        this.transactionsFromNode = props.transactionsFromLocal!
    }

    componentDidMount() {
        this.refresh()
    }
    getFromOrTo = () => {
        const { keyIndex } = this.props
        let from_or_to = ''
        if (keyIndex === 'sent') {
            from_or_to = 'from'
        }
        if (keyIndex === 'received') {
            from_or_to = 'to'
        }
        return from_or_to
    }

    @action
    getMoreTransaction = () => {
        const { activeAccountaddress } = this.props
        const params = {
            from_or_to: this.getFromOrTo(),
            address: activeAccountaddress,
            page: this.currentPage,
            per_page: 10,
        }
        this.getTransctionsfromNode(params)
    }
    @action
    refresh = () => {
        const { activeAccountaddress } = this.props
        const params = {
            from_or_to: this.getFromOrTo(),
            address: activeAccountaddress,
            page: 1,
            per_page: 10
        }
        this.getTransctionsfromNode(params)
    }
    @action
    getTransctionsfromNode = async (params: Params) => {
        const { keyIndex } = this.props
        if (keyIndex === 'failed') return
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
                    this.transactionsFromNode = this.props.transactionsFromLocal ? [...this.props.transactionsFromLocal!, ...txs] : txs
                })
            } else {
                runInAction(() => {
                    this.transactionsFromNode = [...this.transactionsFromNode, ...txs]
                })
            }
        }
    }

    render() {
        const { activeAccountaddress, labels } = this.props
        return (
            <FlatList
                refreshing={false}
                onRefresh={this.refresh}
                keyExtractor={(item: TransactionModel, index: number) => item.from + index}
                onEndReached={this.getMoreTransaction}
                onEndReachedThreshold={0.1}
                data={this.transactionsFromNode}
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