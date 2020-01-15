import React from "react"
import { TouchableOpacity, View, Image, BackHandler } from "react-native"
import { withNavigation } from "react-navigation"
import BACK_GRAY_IMG from "Assets/back.png"
interface Props {
    navigation: any
    imageSource?: any
    content?: React.ReactNode
}
export class CustomBack extends React.Component<Props>{
    handleCustomBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        const { imageSource } = this.props
        return (
            <TouchableOpacity onPress={this.handleCustomBack}>
                <View style={{
                    paddingLeft: 12,
                    width: 60,
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    {!this.props.content &&<Image source={imageSource ? imageSource : BACK_GRAY_IMG} style={{ width: 10, height: 16 }} />}
                    {this.props.content}
                </View>
            </TouchableOpacity>
        )
    }
}
export default withNavigation(CustomBack)