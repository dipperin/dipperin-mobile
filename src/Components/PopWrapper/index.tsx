import React from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  animationType?: 'none' | 'slide' | 'fade',
  visible: boolean
  confrimText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

const PopWrapper = (Target: React.ComponentType<Props>): React.ReactNode => {
  return class extends React.Component<Props> {
    static defaultProps = {
      animationType: 'fade',
    }
    render() {
      const {animationType, visible} = this.props
      return (
        <Modal
          animationType={animationType}
          transparent={true}
          visible={visible}
        >
          <View style={styles.popWrapper}>
            <Target {...this.props}/>
            <View style={styles.btnWrapper}>
              <TouchableOpacity>
                <Text></Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text></Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )
    }
  }
}

export default PopWrapper

export const styles = StyleSheet.create({
  popWrapper: {

  },

  btnWrapper: {

  }
})

