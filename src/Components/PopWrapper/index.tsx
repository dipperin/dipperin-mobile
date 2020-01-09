import React from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import i18n from 'I18n'

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
      cancelText: i18n.t('dipperin:cancel'),
      confrimText: i18n.t('dipperin:confirm')
    }
    render() {
      const { animationType, visible, cancelText, confrimText } = this.props
      return (
        <Modal
          animationType={animationType}
          transparent={true}
          visible={visible}
        >
          <View style={styles.popWrapper}>
            <Target {...this.props} />
            <View style={styles.btnWrapper}>
              <TouchableOpacity>
                <Text>{cancelText}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>{confrimText}</Text>
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

