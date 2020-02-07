import React from 'react'
import { Icon } from 'Components/Icon'
import { TouchableOpacity } from 'react-native'

interface Props {
    isEyeOpen: boolean
    onPress: (val: boolean) => void
}

class Eye extends React.Component<Props>{
    handlePress = () => {
        this.props.onPress(!this.props.isEyeOpen)
    }
    render(){
        return (
            <TouchableOpacity onPress={this.handlePress}>
                {this.props.isEyeOpen ? <Icon name={'icon|openEye'} size={20} color={'#67686E'} /> : <Icon name={'icon|closedEye'} size={20} color={'#67686E'} />}
            </TouchableOpacity>
        )
    }
}

export default Eye
