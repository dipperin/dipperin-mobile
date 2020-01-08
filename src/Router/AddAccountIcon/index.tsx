import React from "react"
import { TouchableOpacity, StyleSheet, View } from "react-native"
import { Icon } from 'Components/Icon'

interface Props {
    onPress: () => void
}
const AddAccountIcon = (props: Props) => {
    const { onPress } = props
    return (
        <View style={styles.addIcon}>
            <TouchableOpacity
                onPress={onPress}
            >
                <Icon name={'icon|tianjia'} size={25} color="#fff" />
            </TouchableOpacity>
        </View>


    )
}

export default AddAccountIcon

const styles = StyleSheet.create({
    addIcon: {
        paddingRight: 10
    }
})