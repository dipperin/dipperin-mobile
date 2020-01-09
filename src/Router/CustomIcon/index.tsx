import React from "react"
import { TouchableOpacity, StyleSheet, View } from "react-native"

interface Props {
    onPress: () => void
}

class CustomIcon extends React.Component<Props>{


    render(){
        const { onPress,children } = this.props
        return (
            <View style={styles.addIcon}>
                <TouchableOpacity
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
    
    
        )
    }

}


export default CustomIcon

const styles = StyleSheet.create({
    addIcon: {
        paddingRight: 10
    }
})