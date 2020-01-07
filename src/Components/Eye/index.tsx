import React, { useState, useEffect } from "react"
import { Icon } from "Components/Icon"
import { TouchableOpacity } from "react-native"

interface Props{
    isEyeOpen:boolean
    onPress:(val:boolean)=>void
}



const Eye = (props:Props) => {
    const [isEyeOpen, setEyeStatus] = useState(false)
    const handlePress = () => {
        props.onPress(!isEyeOpen)
        setEyeStatus(!isEyeOpen)
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            {isEyeOpen ? <Icon name={"icon|openEye"} size={20} color={"#67686E"} /> : <Icon name={"icon|closedEye"} size={20} color={"#67686E"} />}
        </TouchableOpacity>
    )


}

export default Eye 