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
      cancelText: i18n.t('dipperin:start.cancel'),
      confrimText: i18n.t('dipperin:start.confirm'),
      isConfirm: true,
      onConfirm: () => null
    }
    render() {
      const { animationType, visible, cancelText, confrimText, isConfirm, onCancel, onConfirm } = this.props
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
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.btnTouch, styles.btnCancelTouch]}
                  onPress={onCancel}
                >
                  <Text style={styles.btnCancelText}>{cancelText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.btnTouch, styles.btnConfirmTouch]}
                  onPress={onConfirm}
                >
                  <Text style={styles.btnConfirmText}>{confrimText}</Text>
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
    width: client.width * 0.86,
    borderRadius: 8,
    overflow: "hidden"
  },


  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20
  },
  btnTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    height: 38,
    minWidth: 128,
    borderRadius: 8,
  },
  btnCancelTouch: {
    backgroundColor: '#DEE0E3'
  },
  btnCancelText: {
    lineHeight: 20,
    fontSize: 16,
    color: '#fff'
  },
  btnConfirmTouch: {
    backgroundColor: '#1C77BC'
  },
  btnConfirmText: {
    lineHeight: 20,
    fontSize: 16,
    color: '#fff'
  }
})

