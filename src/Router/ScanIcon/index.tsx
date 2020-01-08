import React from "react"
import { TouchableOpacity, StyleSheet, View } from "react-native"
import { Icon } from 'Components/Icon'

interface Props {
    onPress: () => void
}
const ScanIcon = (props: Props) => {
    const { onPress } = props
    return (
        <View style={styles.addIcon}>
            <TouchableOpacity
                onPress={onPress}
            >
                <Icon name={'icon|saoma'} size={25} color="#333" />
            </TouchableOpacity>
        </View>


    )
}

export default ScanIcon

const styles = StyleSheet.create({
    addIcon: {
        paddingRight: 10
    }
})