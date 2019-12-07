import React, {Component}  from 'react';
import { View,Text, TouchableOpacity,Alert} from 'react-native';
import {Card,CardSection} from './common';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
var jwt_decode = require('jwt-decode');

class AccountDetails extends Component {
    _onPressButton () {
        //var decoded = jwt_decode(this.props.token);
        if(this.props.account.balance == 0) {
        axios.post('http://10.0.2.2:61046/api/accounts/freeze',
        {
            accountNumber: this.props.account.accountNumber,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
         }
        )
        .then(response => {
            this.props.onChange();
            Alert.alert('Başarılı','Hesabınız başarılı bir şekilde kapatıldı');
        })
        .catch(e => {
            console.log(e);
            Alert.alert('Hata','Hesap Silinemedi');
        });
        }
        else {
            Alert.alert("Hata","Bakiyesi 0 olmayan hesabı kapatamazsınız");
        }
    }
    _onPressAccTransactions() {
        Actions.transactions({accountNumber: this.props.account.accountNumber});
    }
    onTransaction() {
        Actions.operations({accountNumber: this.props.account.accountNumber,accounts: this.props.accounts});
    }
    render() {
    return (
            <Card>
                <CardSection>
                    <TouchableOpacity style={styles.textView} onPress={this.onTransaction.bind(this)}> 
                        <Text style={styles.headerTextStyle}>Hesap No:{this.props.account.accountNumber} - {this.props.account.accountNo}</Text>
                        <Text style={styles.headerTextStyle}>{this.props.account.balance}TL</Text>
                    </TouchableOpacity>
                </CardSection>
                <View style={styles.styleTouchable}>
                    <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                        <Text style={styles.textAccountClosing}>Hesap Kapama</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPressAccTransactions.bind(this)}>
                        <Text style={styles.textAccountTransactions}>Hesap İşlemleri</Text>
                    </TouchableOpacity>
                </View>
            </Card>
    );
}
};
const styles = {
    styleTouchable: {
        flexWrap: 'wrap', 
        flexDirection:'row', 
        alignItems: 'flex-start',
        marginTop:5,
    },
    textAccountClosing: {
        width:170,
        color: 'red',
        borderRadius:4,
        borderWidth: 1,
        borderColor: 'red',
        padding:3,
        textAlign: 'center'
    },
    textAccountTransactions :{
        width:170,
        color: 'blue',
        marginLeft:5,
        borderRadius:4,
        borderWidth: 1,
        borderColor: 'blue',
        padding:3,
        textAlign: 'center'
    },
    headerTextStyle: {
        fontSize: 18
    },
    textView: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10
    }
};

export default AccountDetails;
