import React, { Component } from 'react';
import { View,Alert,Text,TextInput,TouchableOpacity, Switch} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import {Card, CardSection} from './common';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
class EstimateCredit extends Component {
  state = {homeCondition:false,phoneCondition:false,creditOffer:'',howManyTimesCreditYouTook:0};
  onChangeHomeCondition(value){
    this.setState({homeCondition:!this.state.homeCondition});
  }
  UNSAFE_componentWillMount() {
    //url degıstırılecek
    /*axios.get('http://10.0.2.2:61046/api/accounts/'+this.props.customerId)
    .then(response => {
      this.setState({ age: response });
    });*/
  }
  onChangePhoneCondition(value) {
    this.setState({phoneCondition:!this.state.phoneCondition});
  }
  onCreditOfferChange(value) {
    var re = /^\d{0,10}(\.\d{0,2}){0,1}$/;
    if(re.test(value) || value=='') {
          this.setState({creditOffer:value});
  }
  }
  estimateCredit() {
    axios.post('http://10.0.2.2:5000/api/',{   
        krediMiktari: parseInt(this.state.creditOffer),
        yas: parseInt(this.props.age),
        evDurumu: !this.state.homeCondition,
        aldigi_kredi_sayi: this.state.howManyTimesCreditYouTook,
        telefonDurumu: !this.state.phoneCondition
    })
    .then(response => {
      if(response.data == 0)
        Alert.alert('Kredi Durumu','Kredi Durumunuz: olumlu');
      else {
        Alert.alert('Kredi Durumu','Kredi Durumunuz: olumsuz');
      }
    })
    .catch(e => {
        Alert.alert('Hata','Kredi Durumunuz sorgulanamadı.' + e);
    });
  }
  render() {
    return (
      <Card>
        <CardSection>
          <Text style={styles.textStyle}>YAŞ : {this.props.age}</Text>
        </CardSection>
        <CardSection>
            <Text style={styles.textStyle}>Ev Yok</Text>
            <Switch onValueChange={this.onChangeHomeCondition.bind(this)} value={this.state.homeCondition}/>
            <Text style={styles.textStyle}>Ev Var</Text>
        </CardSection>        
        <Text style={styles.textStyle}>Kredi Çekmek İstenilen Miktarı Giriniz</Text>
        <View style={styles.container}>
            <TextInput keyboardType='numeric' maxLength={10} placeholder= {'Kredi Miktarı'} onChangeText={this.onCreditOfferChange.bind(this)} value={this.state.creditOffer}/>
        </View>
        <CardSection>
            <Text style={styles.textPhoneCondition}>Telefon Durumu Yok</Text>
            <Switch onValueChange={this.onChangePhoneCondition.bind(this)} value={this.state.phoneCondition}/>
            <Text style={styles.textPhoneCondition}>Telefon Durumu Var</Text>
        </CardSection>
        <CardSection>
            <Text style={styles.textCredit}>Kaç kez kredi çektiniz?</Text>
            <NumericInput value={this.state.howManyTimesCreditYouTook} onChange={value => this.setState({howManyTimesCreditYouTook:value})} 
            totalWidth={140}
            minValue={0} 
            totalHeight={40}
            iconSize={25}
            rounded 
            textColor='#B0228C' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#EA3788' 
            leftButtonBackgroundColor='#E56B70'/>
        </CardSection>
          <TouchableOpacity onPress={this.estimateCredit.bind(this)}>
                    <Text style={styles.buttonEstimateCredit}>Kredi Tahmini</Text>
                </TouchableOpacity>
      </Card>
    );
  }
}

const styles = {
  textPhoneCondition:{
    fontSize:15,
    marginBottom:5
  },
  textCredit: {
    paddingTop:10,
    marginRight:10
  },
  textStyle: {
    fontSize: 20,
    marginBottom:5
  },
  buttonEstimateCredit: {
    color: 'blue',
    borderRadius:4,
    borderWidth: 1,
    borderColor: 'blue',
    padding:10,
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
export default EstimateCredit;