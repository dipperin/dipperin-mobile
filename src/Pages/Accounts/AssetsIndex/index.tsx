import React, { Fragment } from 'react'
import { View, Text, Button } from 'react-native'
import AssetsInfo from "./AssetsInfo"
import AccountList from "./AccountList"

class Assets extends React.Component<any> {

  render() {
    return (
      <Fragment>
        <AssetsInfo />
        {/* <AccountList /> */}
      </Fragment>

    )
  }
}

export default Assets