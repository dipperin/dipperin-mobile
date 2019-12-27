import React from "react"
import { Image } from "react-native"
import { Tabs } from "Global/constans"



import WalletIcon from 'Assets/TabIcon/me-icon.png'
import WalletIconActive from 'Assets/TabIcon/me-icon-active.png'
import DiscoveryIcon from 'Assets/TabIcon/me-icon.png'
import DiscoveryIconActive from 'Assets/TabIcon/me-icon-active.png'
import meIcon from 'Assets/TabIcon/me-icon.png'
import meIconActive from 'Assets/TabIcon/me-icon-active.png'

const IconImg = {
  [Tabs.WALLET]: WalletIcon,
  [Tabs.DISCOVERY]: DiscoveryIcon,
  [Tabs.ME]: meIcon
}

const IconActiveImg = {
  [Tabs.WALLET]: WalletIconActive,
  [Tabs.DISCOVERY]: DiscoveryIconActive,
  [Tabs.ME]: meIconActive
}

interface Props {
  routeName: Tabs
  focused: boolean
}

class TabIcon extends React.Component<Props> {
  getTabIcon = () => {
    const { focused, routeName } = this.props
    const IconConfig = focused ? IconActiveImg : IconImg
    return IconConfig[routeName]
  }
  render() {
    return (
      <Image
        source={this.getTabIcon()}
        style={{ margin: 0, width: 22, height: 22, resizeMode: 'contain' }}
      />
    )
  }
}

export default TabIcon