import React from "react"
import { observer } from "mobx-react"
import { View, Text, StyleSheet } from "react-native"
import LinearGradient from 'react-native-linear-gradient'
import Eye from "Components/Eye"
import { formatNumber } from "Global/utils"
import { I18nAccountType } from 'I18n/config'


interface Props {
    isEyeOpen:  boolean
    setIsEyeOpen: (val: boolean) => void
    assets: number
    labels:I18nAccountType
}

@observer
class AssetsInfo extends React.Component<Props>{

    render() {
        const { isEyeOpen, setIsEyeOpen,assets ,labels} = this.props
        return (
            <LinearGradient
                style={styles.container}
                colors={["#275DA5", "#061120"]}
            >
                <Text style={styles.title}>{labels.total}</Text>
                <View style={styles.dipBox}>
                    {isEyeOpen ? <Text style={styles.num}>{formatNumber(assets,6)} DIP</Text> : <Text style={styles.num}>*******</Text>}
                    <Eye isEyeOpen={isEyeOpen} onPress={setIsEyeOpen} />
                </View>
            </LinearGradient>
        )
    }
}

export default AssetsInfo


const styles = StyleSheet.create({
    container: {
        height: 130,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: "#fff",
        marginBottom: 5
    },
    dipBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    num: {
        fontSize: 25,
        color: "#fff",
        marginLeft: 30,
        marginRight: 12,
    }

})