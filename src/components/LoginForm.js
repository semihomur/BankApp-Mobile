import React,{Component} from 'react';
import {Spinner} from './common';
import {View,Text,TouchableOpacity,StyleSheet, TextInput,ImageBackground,Alert} from 'react-native';
import {IdNoChanged,passwordChanged,loginUser,createUserPage} from '../actions';
import {connect} from 'react-redux';
class LoginFrom extends Component{
    OnIdChange(text) {
        var re = /^[0-9\b]+$/;
        if(re.test(text) || text=='')
        this.props.IdNoChanged(text);
    }
    onPasswordChange(text){
        this.props.passwordChanged(text);
    }
    onButtonPress(){
        const {idNo,password} =this.props;
        if(idNo.length==11 && password.length>=6)
        this.props.loginUser({idNo,password});
        else {
            Alert.alert('Hata','TC kimlik numaranız 11 haneli olmak zorundadır,şifreniz ise minumum 6 haneli olmalıdır.');
        }
    }
    onCreateButtonPress(){
        this.props.createUserPage();
    }
    renderError(){
        if(this.props.error){
            return (
                <View><Text style={styles.errorStyle}>{this.props.error}</Text></View>
            );
        }
    }
    renderLogIn(){
        if(this.props.loading){
            return <Spinner size="large"/>
        }
        return (
            <TouchableOpacity style={styles.loginButton} onPress={this.onButtonPress.bind(this)}>
                <Text style= {styles.buttonText}>GİRİŞ</Text>
            </TouchableOpacity>
        );
    }
    render(){ 
        return(
            <ImageBackground style={styles.container} blurRadius={1.5} source={require('./app/img/BankLoginRegister.jpg')}>  
                <Text style={styles.header}>Giriş Yap</Text>
                    <View style={styles.IdContainer}>
                        <TextInput keyboardType='numeric' maxLength={11} placeholder= {'TC Kimlik No'} onChangeText={this.OnIdChange.bind(this)} value={this.props.idNo}/>
                    </View>
                    <View style={styles.passwordContainer}>
                        <TextInput style={styles.textInput} secureTextEntry label="password" placeholder="Şifre" onChangeText={this.onPasswordChange.bind(this)} value={this.props.password}/>
                    </View>
                {this.renderError()}
                {this.renderLogIn()}
                <TouchableOpacity style={styles.loginButton} onPress={this.onCreateButtonPress.bind(this)}>
                    <Text style= {styles.buttonText}>Kayıt Ol</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'stretch',
      width: null,
      justifyContent: 'center',
      alignItems: 'center'
     },
     header: {
       fontSize: 50,
       color: 'rgba(245, 0, 126, 1))',
       fontWeight: 'bold',
       fontFamily: 'fantasy'
    },
    IdContainer: {
         width:325,
         borderColor: '#CFD0D1',
         borderWidth: 2,
         height:50,
         padding:0,
         borderRadius: 20,
         borderBottomWidth:0,
         backgroundColor:'#F5F6F7',
         marginBottom: 20
    },
    passwordContainer: {
        width:325,
        borderColor: '#CFD0D1',
        borderWidth: 2,
        height:50,
        padding:0,
        borderRadius:20,
        backgroundColor:'#F5F6F7',
        marginBottom:20,
        zIndex: 2
    },
    loginButton: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderWidth:1,
        borderRadius: 40,
        marginBottom:20
    }, 
    buttonText: {
        color:'#fff',
        fontWeight:'bold'
    },
    errorStyle:{
        fontSize:20,
        alignSelf:'center',
        color:'red'
    }
});
//bind edersek buranın thisini etmessek inputun thisini kullanır
const mapstateToProps = state =>{
    return {
        idNo:state.auth.idNo,
        password:state.auth.password,
        error:state.auth.error,
        loading:state.auth.loading
    };
};
export default connect(mapstateToProps,{IdNoChanged,passwordChanged,loginUser,createUserPage})(LoginFrom);