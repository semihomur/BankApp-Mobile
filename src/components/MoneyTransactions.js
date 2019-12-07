import React, { Component } from 'react';
import { View,Alert,Text,TextInput,TouchableOpacity, Switch} from 'react-native';
import {Card, CardSection} from './common';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
class MoneyTransactions extends Component {
  state = {amountPutting:'',amountReducing:'',transactions:[], typeOperation:false};
  onChangeOperation(value){
    this.setState({typeOperation:!this.state.typeOperation});
}
  OnAmountPuttingChange(value) {
    var re = /^\d{0,10}(\.\d{0,2}){0,1}$/;
        if(re.test(value) || value=='') {
              this.setState({amountPutting:value});
    }
  }
  OnAmountRefusingChange(value) {
    var re = /^\d{0,10}(\.\d{0,2}){0,1}$/;
        if(re.test(value) || value=='') {
              this.setState({amountReducing:value});
    }
  }
  onAddMoney() {
    axios.post('http://10.0.2.2:61046/api/accounts/paymoney',
    {   
        accountNumber:this.props.accountNumber,
        money: this.state.amountPutting
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
     }
    )
    .then(response => {
        Alert.alert('Başarılı','Para Yatırıldı');
        Actions.menu();
    })
    .catch(e => {
        Alert.alert('Hata','Paranız Yatıralamadı');
    });
  }
  onReduceMoney() {
    axios.post('http://10.0.2.2:61046/api/accounts/withdrawmoney',
    {   
        accountNumber:this.props.accountNumber,
        money: this.state.amountReducing
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
     }
    )
    .then(response => {
        Alert.alert('Başarılı','Paranız hesabınızdan çekildi');
        Actions.menu();
    })
    .catch(e => {
        Alert.alert('Hata','Yeterli Bakiye Yok');
    });
  }
  renderOperation() { 
    if(!this.state.typeOperation)
      return <Card>
         <View style={styles.putMoney}>
            <Text style={styles.textStyle}>Yatırmak istediğiniz ücreti giriniz</Text>
          <View style={styles.container}><TextInput keyboardType='numeric' maxLength={10} placeholder= {'Ücret'} onChangeText={this.OnAmountPuttingChange.bind(this)} value={this.state.amountPutting}/></View>
          <TouchableOpacity onPress={this.onAddMoney.bind(this)}>
                    <Text style={styles.buttonPutMoney}>Para Yatır</Text>
                </TouchableOpacity>
        </View>
      </Card>
    return <Card>
      <View>
        <Text style={styles.textStyle}>Para çekmek istediğiniz ücreti giriniz</Text>
          <View style={styles.container}><TextInput keyboardType='numeric' maxLength={10} placeholder= {'Ücret'} onChangeText={this.OnAmountRefusingChange.bind(this)} value={this.state.amountReducing}/></View>
          <TouchableOpacity onPress={this.onReduceMoney.bind(this)}>
                    <Text style={styles.buttonText}>Para Çek</Text>
                </TouchableOpacity>
        </View>
    </Card> 

  }
  render() {
    return (
      <Card>
          <CardSection>
            <Text style={styles.textStyle}>Para Yatırma</Text>
            <Switch onValueChange={this.onChangeOperation.bind(this)} value={this.state.typeOperation}/>
            <Text style={styles.textStyle}>Para Çekme</Text>
          </CardSection>
          {this.renderOperation()}
      </Card>
    );
  }
}

const styles = {
  putMoney: {
    marginRight:5
  },
  textStyle: {
    fontSize: 20,
    marginBottom:5
  },
  textAllTransactions: {
    fontSize: 20,
    marginTop:25,
  },
  styleMainContainer: {
    flexWrap: 'wrap', 
    flexDirection:'row', 
    alignItems: 'flex-start',
    marginTop:5,
  },
  buttonPutMoney: {
    color: 'green',
    borderRadius:4,
    borderWidth: 1,
    borderColor: 'green',
    padding:3,
    textAlign: 'center'
  },
  buttonText: {
    color: 'red',
    borderRadius:4,
    borderWidth: 1,
    borderColor: 'red',
    padding:3,
    textAlign: 'center'
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
 },
}
export default MoneyTransactions;