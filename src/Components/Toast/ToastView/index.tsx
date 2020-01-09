import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,  
  Easing,
  Animated,
} from 'react-native'

import IconSuccess from './success.png'
import { posConfigs } from './config'

const {width, height} = Dimensions.get('window');

const defaultTime = 2000;

interface Props {
  message: string
  time?: number 
  position?: string 
  isSuccess?: boolean 
  onDismiss: Function 
}

class ToastView extends React.Component<Props> {
  moveAnim = new Animated.Value(height);
  opacityAnim = new Animated.Value(0);
  dismissHandler: any = null;

  static defaultProps = {
    time: defaultTime,
    position: 'center',
    isSuccess: false
  }

  constructor(props: any) {
    super(props);
    const _config = posConfigs[props.position]
    this.state = {
      message: props.message !== undefined ? props.message : '',
      time: props.time,
      position: props.position,
      posConfig: _config,
      isSuccess: props.isSuccess
    }
    this.moveAnim = new Animated.Value(_config.startAnimHeight)
  }

  shouldComponentUpdate(nextProps: any) {
    if (nextProps.message !== this.props.message) {
      const _config = nextProps.position !== undefined ? posConfigs[nextProps.position] : posConfigs.center
      this.setState({
        message: nextProps.message !== undefined ? nextProps.message : '',
        time: nextProps.time !== undefined ? nextProps.time : defaultTime,
        position: nextProps.position !== undefined ? nextProps.position : 'center',
        posConfig: _config,
        isSuccess: nextProps.isSuccess !== undefined ? nextProps.isSuccess : false
      })
      clearTimeout(this.dismissHandler)
      this.timingDismiss()
    }
    return true
  }

  render() {
    const {message, posConfig, position, isSuccess}: any = this.state
    const _animConfig = position === 'bottom' 
                      ? {bottom: this.moveAnim, opacity: this.opacityAnim}
                      : {top: this.moveAnim, opacity: this.opacityAnim}
    return (
      <View 
        style={styles.container}
        pointerEvents='none'
      >
        <Animated.View 
          style={[styles.textContainer, position === 'bottom' && styles[posConfig.styleName], _animConfig]}>
          {isSuccess && <Image source={IconSuccess} style={styles.IconSuccess}/>}
          <Text style={styles.defaultText}>{message}</Text>
        </Animated.View>
      </View>
    )
  }

  componentDidMount() {
    const {posConfig: {endAnimHeight}}: any = this.state
    Animated.timing(
      this.moveAnim,
      {
        toValue: endAnimHeight,
        duration: 80,
        easing: Easing.ease
      }
    ).start(this.timingDismiss);
    Animated.timing(
      this.opacityAnim,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.linear
      }
    ).start();
  }

  componentWillUnmount() {
    clearTimeout(this.dismissHandler)
  }

  timingDismiss = () => {
    const {time}: any = this.state
    this.dismissHandler = setTimeout(() => {
      this.dismiss()
    }, time)
  }

  dismiss = () => {
    Animated.timing(
      this.opacityAnim,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.linear
      }
    ).start(this.onDismiss)
  }

  onDismiss = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
  }
}

export default ToastView


export const styles: any = StyleSheet.create({
  textContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
    borderRadius: 8,
    padding: 10,
    maxWidth: width * 0.8,
    alignSelf: 'flex-start',
    alignItems: 'center',
    zIndex: 999,
  },
  posBottom: {
    alignSelf: 'flex-end'
  },
  IconSuccess: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 4,
    width: 40,
    height: 40,
  },
  defaultText: {
    color: "#FFF",
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
  }
})









