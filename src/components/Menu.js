import React, { Component } from 'react';
import { View } from 'react-native';
import AccountList from './AccountList';
 
export default class Menu extends Component {
    render() {
      return (
        <View style={{ flex: 1 }}>
            <AccountList />
        </View>     
      );
    }
  }