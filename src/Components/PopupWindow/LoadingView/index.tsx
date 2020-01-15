import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
const { height } = Dimensions.get('window')

interface Props {
  text?: string 
  time?: number 
  onDismiss: Function 
}

class Loading extends React.Component<Props> {
  _timer: any

  static defaultProps = {
    text: '',
    time: 30000 
  }

  componentDidMount() {
    const { time } = this.props
    if (!time) {
      return
    }
    clearTimeout(this._timer)
    this._timer = setTimeout(() => {
      this.dismiss()
    }, time)
  }

  shouldComponentUpdate(nextProps: any) {
    const { time } = nextProps
    if (!time && time !== 0) {
      return false
    }
    clearTimeout(this._timer)
    this._timer = setTimeout(() => {
      this.dismiss()
    }, time)

    return true
  }

  render() {
    const { text } = this.props
    return (
      <View style={styles.container} pointerEvents="box-only">
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size={50} color={'#666'} style={styles.loading} />
          <Text>{text}</Text>
        </View>
      </View>
    )
  }

  componentWillUnmount() {
    this._timer && clearTimeout(this._timer)
    this._timer = null
  }

  dismiss = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
  }
}

export default Loading

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loadingWrapper: {
    top: height / 2 - 30,
    backgroundColor: 'transparent'
  },
  loading: {
    width: 100,
    height: 100
  }
})
