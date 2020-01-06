import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { Tabs } from "@ant-design/react-native"



const TxRecord = () => {
    const tabs = [
        { title: '全部' },
        { title: '发送' },
        { title: '接收' },
        { title: '失败' },
    ];
    const style = {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        backgroundColor: '#fff',
    } as any

    return (
        <View style={styles.tabsBox}>
            <Tabs
                tabs={tabs}
                tabBarInactiveTextColor={"#5F6064"}
                tabBarActiveTextColor={"#1C77BC"}
                tabBarUnderlineStyle={styles.bottomLine}
            >
                <View style={style}>
                    <Text>Content of First Tab</Text>
                </View>
                <View style={style}>
                    <Text>Content of Second Tab</Text>
                </View>
                <View style={style}>
                    <Text>Content of Third Tab</Text>
                </View>
                <View style={style}>
                    <Text>Content of fourth Tab</Text>
                </View>
            </Tabs>
        </View>
    )
}

export default TxRecord

const styles = StyleSheet.create({
    tabsBox:{
        flex:1,
        paddingHorizontal:10
    },
    bottomLine: {
        backgroundColor: "#1C77BC"
    }
})
