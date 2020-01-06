import React from "react"
import { View, Text, StyleSheet } from "react-native"
import LinearGradient from 'react-native-linear-gradient'

const AssetsInfo = () => {

    return (
            <LinearGradient
            style={styles.container}
                colors={["#275DA5", "#061120"]}
            >
                <Text style={styles.title}>{"总资产"}</Text>
                <Text style={styles.num}>{15241521}</Text>

            </LinearGradient>
    )
}

export default AssetsInfo


const styles = StyleSheet.create({
    container: {
        height: 130,
        justifyContent: "center",
        alignItems:"center"
    },
    title:{
        color:"#fff",
        marginBottom:5
    },
    num:{
        fontSize:25,
        color:"#fff"
    }

})