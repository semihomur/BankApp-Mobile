import React, { Component } from 'react';
import { ScrollView,Alert, AsyncStorage,Text} from 'react-native';
import axios from 'axios';
import AccountDetails from './AccountDetails';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {CardSection, Button2, Button} from './common';

var jwt_decode = require('jwt-decode');

class AccountList extends Component {
  state = { accounts: [], customerId:'', age: ''};

  /*_retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        var decoded = jwt_decode(value);
        return decoded.nameid;
      }
    } catch (error) {
      return 0;
    }
  };*/
  UNSAFE_componentWillMount() {
    // 'http://10.0.2.2:5000/api/auth/register'
    var decoded = jwt_decode(this.props.token);
    this.setState({customerId: decoded.nameid, age: decoded.birthdate});
    axios.get('http://10.0.2.2:61046/api/accounts/'+decoded.nameid)
    .then(response => {
      this.setState({ accounts: response.data });
    });
  }
  onChange = () => {
    var decoded = jwt_decode(this.props.token);
    axios.get('http://10.0.2.2:61046/api/accounts/'+decoded.nameid)
    .then(response => this.setState({ accounts: response.data }));
  }
  renderAlbums() {
    return this.state.accounts.map(account => <AccountDetails accounts={this.state.accounts} onChange={this.onChange} key={account.accountId} account={account} token={this.props.token}/>);
  }
  NewAccount() {
    var decoded = jwt_decode(this.props.token);
    axios.post('http://10.0.2.2:61046/api/accounts/add',{
      customerid:decoded.nameid
    })
    .then(res=>{
      this.onChange();
      Alert.alert('Başarılı','Hesabınız başarılı bir şekilde açıldı');
    })
    .catch(e=>{
      Alert.alert('Hata','Hesap oluşturulamadı.');                
    });
  }
  PayBill() {
    Actions.paybill({accounts: this.state.accounts});
  }
  EstimateCredit() {
    Actions.estimatecredit({age: this.state.age});
  }
  render() {
    return (<ScrollView>
      <CardSection>
        <Text style={styles.headerTextStyle}>Müşteri No: {+this.state.customerId+1000000000}</Text>
      </CardSection>
      {this.renderAlbums()}
             <CardSection>
                <Button2 onPress={this.NewAccount.bind(this)} style={styles.textAccountOpen}>
                Hesap Aç</Button2>
            </CardSection>
            <CardSection>
                <Button onPress={this.PayBill.bind(this)}>
                Fatura Öde</Button>
            </CardSection>
            <CardSection>
                <Button2 style={styles.textCreditEstimate} onPress={this.EstimateCredit.bind(this)}>
                Kredi Tahmini</Button2>
            </CardSection>
      </ScrollView>);
  }
}

const mapstateToProps = state =>{
  return {
      token:state.auth.token
  };
};
const styles = {
  headerTextStyle: {
      fontSize: 30,
      flex: 1,
      marginLeft:5

  },
  textAccountOpen: {
    fontSize: 16,
    fontWeight: '600',
    color: '#228B22',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  textCreditEstimate: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color:'#FFBA00'
  }
};
export default connect(mapstateToProps)(AccountList);