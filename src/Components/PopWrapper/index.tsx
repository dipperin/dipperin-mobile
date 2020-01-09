import React from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import i18n from 'I18n'

const client = Dimensions.get('window')

export interface PopWrapperPropsInterface {
  visible: boolean
  animationType?: 'none' | 'slide' | 'fade',
  isConfirm?: boolean
  confrimText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel: () => void
}

const PopWrapper = (Target: React.ComponentType<any>): any => {
  return class extends React.Component<PopWrapperPropsInterface> {
    static defaultProps = {
      animationType: 'fade',
      cancelText: i18n.t('dipperin:cancel'),
      confrimText: i18n.t('dipperin:confirm'),
      isConfirm: true
    }
    render() {
      const { animationType, visible, cancelText, confrimText, isConfirm } = this.props
      return (
        <Modal
          animationType={animationType}
          transparent={true}
          visible={visible}
        >
          <View style={styles.popWrapper}>
            <View style={styles.mask}>
              <Target {...this.props} />

              {isConfirm && <View style={styles.btnWrapper}>
                <TouchableOpacity>
                  <Text>{cancelText}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>{confrimText}</Text>
                </TouchableOpacity>
              </View>}
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
    width: client.width,
    height: "100%",
    backgroundColor: 'rgba(52,52,52,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mask: {
    backgroundColor: '#fff',
    width: client.width * 0.8,
    borderRadius: 8,
    overflow: "hidden"
  },


  btnWrapper: {
    
  },
})

