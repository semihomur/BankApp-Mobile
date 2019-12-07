import React, {Component}  from 'react';
import { View,Text,Alert,Switch,TextInput, TouchableOpacity, Picker} from 'react-native';
import {Card,CardSection} from './common';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
class Operations extends Component {
    state = {typeOperation:false,customerAccountNo:'', amount:''}
    onChangeOperation(value){
        this.setState({typeOperation:!this.state.typeOperation});
    }
    _onPressButton() {
        if(this.state.typeOperation) {
            axios.post('http://10.0.2.2:61046/api/accounts/havale',
            {   
                SendingAccountId:this.props.accountNumber,
                ReceivingAccountId: this.state.customerAccountNo,
                money: this.state.amount
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
             }
            )
            .then(response => {
                Alert.alert('Başarılı','Ücret başarılı bir şekilde karşı hesaba gönderildi');
                Actions.menu();
            })
            .catch(e => {
                Alert.alert('Hata','Girdiğiniz değerleri kontrol ediniz.Hata oluştu.');
            });
        }
        else {
            let recivingAccountNumber=0;
            for(let i = 0; i< this.props.accounts.length ; i++) {
                if(this.props.accounts[i].accountNo==this.state.customerAccountNo){
                    recivingAccountNumber=this.props.accounts[i].accountNumber;
                }
            }
            axios.post('http://10.0.2.2:61046/api/accounts/virman',
            {   
                ReceivingAccountId: recivingAccountNumber,
                SendingAccountId: this.props.accountNumber,
                Money: this.state.amount
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
             }
            )
            .then(response => {
                Alert.alert('Başarılı','Ücret başarılı bir şekilde diğer hesabınıza gönderildi');
                Actions.menu();
            })
            .catch(e => {
                console.log(e);
                Alert.alert('Hata','Girdiğiniz değerleri kontrol ediniz.Hata oluştu.'+e);
            });
        }
    }
    OnCustomerAccountNoChange(value) {
        var re = /^[0-9\b]+$/;
        if(re.test(value) || value=='')
            this.setState({customerAccountNo:value});
    }
    OnAmountChange(value) {
        var re = /^\d{0,10}(\.\d{0,2}){0,1}$/;
        if(re.test(value) || value=='') {
            this.setState({amount:value});
    }
    }
    getAccounts() {
        var pickerArr = [];
        pickerArr.push(<Picker.Item key="0" label="SEÇİNİZ" value="0"/>)
        var snapshotList = this.props.accounts;
        for (var key in snapshotList) {
            if(snapshotList[key].accountNumber !=this.props.accountNumber) {
                pickerArr.push(<Picker.Item key={snapshotList[key].accountNo} label={""+snapshotList[key].accountNo} value={snapshotList[key].accountNo} />)
            }
        }
        return pickerArr;
    }
    renderOperation() {
        if(this.state.typeOperation)
            return <Card>
                        <View>
                            <View style={styles.IdContainer}><TextInput keyboardType='numeric' maxLength={10} placeholder= {'Gönderilecek Hesap No'} onChangeText={this.OnCustomerAccountNoChange.bind(this)} value={this.state.customerAccountNo} /></View>
                            <View style={styles.IdContainer}><TextInput keyboardType='numeric' maxLength={10} placeholder= {'Ücret'} onChangeText={this.OnAmountChange.bind(this)} value={this.state.amount} /></View>
                        </View> 
                   </Card>
            return <Card>
                        <View>
                            <View>
                                <Text style={styles.message}>Para Aktarmak İstediğiniz Hesabınızı Seçiniz</Text>
                                <Picker selectedValue={(this.state.customerAccountNo)} onValueChange={this.OnCustomerAccountNoChange.bind(this)}>
                                {this.getAccounts()}
                                </Picker>
                            </View>
                              <View style={styles.IdContainer}><TextInput keyboardType='numeric'  maxLength={10} placeholder= {'Ücret'} onChangeText={this.OnAmountChange.bind(this)} value={this.state.amount}/></View>
                        </View> 
                    </Card>
    }
    render() {
    return (
            <Card>
                <CardSection>
                    <Text style={styles.textStyle}>Virman</Text>
                  <Switch onValueChange={this.onChangeOperation.bind(this)} value={this.state.typeOperation}/>
                  <Text style={styles.textStyle}>Havale</Text>
                </CardSection>
                {this.renderOperation()}
                <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                    <Text style={styles.styleSendButton}>Gönder</Text>
                </TouchableOpacity>
            </Card>
    );
}
};
const styles = {
    textStyle: {
        fontSize: 20,
    },
    styleSendButton: {
        color: 'green',
        borderRadius:8,
        borderWidth: 1,
        borderColor: 'green',
        padding:15,
        textAlign: 'center'
    },
    IdContainer: {
        width:325,
        borderColor: '#fff',
        borderWidth: 2,
        height:50,
        padding:0,
        borderRadius: 20,
        borderBottomWidth:0,
        backgroundColor:'#fff',
        marginBottom: 20
   },
}
const mapstateToProps = state =>{
    return {
        token:state.auth.token
    };
  };
export default Operations;