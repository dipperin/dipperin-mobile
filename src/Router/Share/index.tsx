import React from 'react'
import { withNavigation } from 'react-navigation'
import { Icon } from 'Components/Icon'
import { TouchableOpacity, Share } from 'react-native'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import Toast from 'Components/Toast'
import CustomIcon from 'Router/CustomIcon'

interface Props {
  navigation: NavigationStackScreenProps['navigation']
}

// class ShareIcon extends React.Component<Props> {
//   onShare = async (message: string) => {
//     try {
//       const result = await Share.share({
//         message,
//       });

//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error) {
//       Toast.info(error.message);
//     }
//   };

//   handlePress = () => {
//     const shareMsg = this.props.navigation.getParam('shareMsg');
//     if (shareMsg) {
//       this.onShare(shareMsg);
//     }
//   };
//   render() {
//     return (
//       <TouchableOpacity onPress={this.handlePress} style={{paddingRight: 20}}>
//         <Icon name={'icon|fenxiang'} size={20} color={'#ffffff'} />
//       </TouchableOpacity>
//     );
//   }
// }

const ShareIcon = (props: Props) => {
  const onShare = async (message: string) => {
    try {
      await Share.share({
        message,
      })
    } catch (error) {
      Toast.info(error.message)
    }
  }
  const onPress = () => {
    const shareMsg = props.navigation.getParam('shareMsg')
    if (shareMsg) {
      onShare(shareMsg)
    }
  }

  return (
    <CustomIcon onPress={onPress}>
      <Icon name={'icon|fenxiang'} size={20} color={'#ffffff'} />
    </CustomIcon>
  )
}

export default withNavigation(ShareIcon)
