import React, { Component } from 'react';
import { View,Alert,Text,TextInput,TouchableOpacity, Picker} from 'react-native';
import {Card} from './common';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

class PayBill extends Component {
  state = {typeOperation:false,SubsNo:'', customerAccountNo:'',dept:''}
    onGetDept(value){
      //url degıstırılecek
      axios.get('http://10.0.2.2:61046/api/accounts/querydebt/' +this.state.SubsNo)
      .then(res=>{
        if(res.data.price == "0") {
          Alert.alert('*','Borcunuz yoktur.');
        }
        if(res.data == "") {
          Alert.alert('Hata','Böyle bir abone numarasına ait kayıt yoktur');
        } 
        if(res.data !="" && res.data.price != "0") {
          this.setState({typeOperation:!this.state.typeOperation,dept:res.data.price});
        }
      })
      .catch(e=>{
        Alert.alert('Hata','Borcunuz sorgulanamadı.'+ e);
      });
    }
    OnChangeSubsNo(value){
      var re = /^[0-9\b]+$/;
      if(re.test(value) || value=='')
          this.setState({SubsNo:value});
    }
    OnCustomerAccountNoChange(value) {
      var re = /^[0-9\b]+$/;
      if(re.test(value) || value=='')
          this.setState({customerAccountNo:value});
    }
    OnPayDept() {
      let accountNumber=0;
            for(let i = 0; i< this.props.accounts.length ; i++) {
                if(this.props.accounts[i].accountNo==this.state.customerAccountNo){
                  accountNumber=this.props.accounts[i].accountNumber;
                }
      }
      //url degıstırılecek
      axios.post('http://10.0.2.2:61046/api/accounts/paydebt/' + this.state.SubsNo,{
        accountNumber: accountNumber,
        price: this.state.dept
      })
      .then(res=>{
        Actions.menu();
        Alert.alert('Başarılı','Borcunuz başarılı bir şekilde ödendi.');
      })
      .catch(e=>{
        Alert.alert('Hata','Borcunuz ödenemedi,hesabınızda yeterli bakiye yok.');                
      });
    }
    getAccounts() {
      var pickerArr = [];
      pickerArr.push(<Picker.Item key="0" label="SEÇİNİZ" value="0"/>)
      var snapshotList = this.props.accounts;
      for (var key in snapshotList) {
              pickerArr.push(<Picker.Item key={snapshotList[key].accountNo} label={""+snapshotList[key].accountNo} value={snapshotList[key].accountNo} />)
      }
      return pickerArr;
  }
  renderOperation() {
    if(!this.state.typeOperation)
        return <Card>
          <View style={styles.container}><TextInput keyboardType='numeric' maxLength={11} placeholder= {'Sorgulanacak Abone No:'} onChangeText={this.OnChangeSubsNo.bind(this)} value={this.state.SubsNo}/></View>
                    <TouchableOpacity onPress={this.onGetDept.bind(this)}>
                    <Text style={styles.styleSendButton}>Sorgula</Text>
                </TouchableOpacity>
               </Card>
        return <Card>
                    <Text style={styles.textStyle}>{this.state.SubsNo} abone numaralı hesabın borcu {this.state.dept} TL'dir.</Text>
                    <View>
                                <Text>Borcu ödemek istediğiniz hesabınızı seçiniz</Text>
                                <Picker selectedValue={(this.state.customerAccountNo)} onValueChange={this.OnCustomerAccountNoChange.bind(this)}>
                                {this.getAccounts()}
                                </Picker>
                                <TouchableOpacity onPress={this.OnPayDept.bind(this)}>
                                          <Text style={styles.styleSendButton}>Öde</Text>
                                </TouchableOpacity>
                            </View>
                </Card>
}
  render() {
    return (
      <View>
        {this.renderOperation()}
      </View>
    );
  }
}

const styles = {
  styleSendButton: {
    color: 'green',
    borderRadius:8,
    borderWidth: 1,
    borderColor: 'green',
    padding:15,
    textAlign: 'center'
},
  textStyle: {
    fontSize: 15,
    marginBottom:5
  },
  container: {
    borderColor: '#fff',
    borderWidth: 2,
    height:50,
    padding:0,
    borderRadius: 5,
    borderBottomWidth:0,
    backgroundColor:'#fff',
    marginBottom: 20
}
}
export default PayBill;