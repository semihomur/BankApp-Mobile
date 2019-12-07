import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, View} from 'react-native';
import { user_Update, createNewUser } from '../actions';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
class CreateForm extends React.Component {
    constructor() {
        super()
        this.state = {
            isVisible: false,
            chosenDate: '',
            realDate:'',
            isText: true,
            maximumDate: new Date().getTime() - (24*60*60*1000) * 18 * 366,
        }
    }
    handlePicker = (datetime) => {
        this.setState({
            realDate:datetime,
            isVisible: false,
            chosenDate: moment(datetime).format('L'),
            isText: false
        });
    }
    showPicker = () => {
        this.setState({
            isVisible: true
        })
    }
    hidePicker = () => {
        this.setState({
            isVisible: false
        });
    }
    renderError(){
        if(this.props.error){
            return (
                <View><Text style={styles.errorStyle}>{this.props.error}</Text></View>
            );
        }
    }
    addTextFirstName(value) {
        var re = /^[a-zA-z-ğüşöıçİĞÜŞÖÇ]+$/;
        if(re.test(value) || value=='')
        this.props.user_Update({ prop: 'ad', value });
    }
    addTextLastName(value) {
        var re = /^[a-zA-z-ğüşöıçİĞÜŞÖÇ]+$/;
        if(re.test(value) || value=='')
        this.props.user_Update({ prop: 'soyad', value });
    } 
    renderDateOrText = () => {
        dogumTarihi=this.state.chosenDate;
        this.props.user_Update({prop:'dogumTarihi',value:this.state.chosenDate});
        return !this.state.isText ? (<Text style={{ color: 'red', fontSize: 20, alignItems: 'center' }}>
            {this.state.chosenDate}
        </Text>) : <Text style={styles.dogumText} >Doğum Tarihinizi Seçmek İçin Dokunun</Text>
    }
    onCreateUserPress() {
        let { newEmail, newPassword, dogumTarihi, tcno, ad, soyad,phoneNumber } = this.props;   
        dogumTarihi=this.state.realDate;
        this.props.createNewUser({ newEmail, newPassword,dogumTarihi, tcno, ad, soyad,phoneNumber });   
    }
    onChangeId(value) {
        var re = /^[0-9\b]+$/;
        if(re.test(value) || value==''){
            this.props.user_Update({ prop: 'tcno',value});
        }
    }
    onChangePhoneNumber(value) {
        var re = /^[0-9\b]+$/;
        if(re.test(value) || value==''){
            this.props.user_Update({prop:'phoneNumber',value})
        }
    }
    onChangeMail(value) {
        var re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(value)  || value=='')
            this.props.user_Update({ prop: 'newEmail', value })}

    
    render() {
        return (
            <ImageBackground style={styles.container} blurRadius={0.5} source={require('./app/img/BankLoginRegister.jpg')}>
                <Text style={styles.header}>Kayıt Ol</Text>
                <View style={styles.emailContainer}>
                    <TextInput placeholder={'Ad'} value={this.props.ad} onChangeText={
                        this.addTextFirstName.bind(this)} 
                        maxLength={10}
                    />
                </View>
                <View style={styles.emailContainer}>
                    <TextInput placeholder={'Soyad'} value={this.props.soyad} onChangeText={
                        this.addTextLastName.bind(this)} maxLength={10}/>
                </View>
                <View style={styles.emailContainer}>
                    <TextInput keyboardType='numeric' placeholder={'TC No'} 
                    value={this.props.tcno} onChangeText={this.onChangeId.bind(this)}
                     maxLength={11} 
                     />
                </View>
                <TouchableOpacity style={styles.buttonDt} onPress={this.showPicker}>
                    {this.renderDateOrText()}
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode={'date'}
                    datePickerModeAndroid={'spinner'}
                    maximumDate={this.state.maximumDate}
                    
                />
                <View style={styles.emailContainer}>
                    <TextInput maxLength={11} keyboardType='numeric' placeholder={'Telefon No'} value={this.props.phoneNumber}
                        onChangeText={this.onChangePhoneNumber.bind(this)}
                    ></TextInput>
                </View>
                <View style={styles.emailContainer}>
                    <TextInput maxLength={25} keyboardType='email-address' placeholder={'E-posta'} value={this.props.newEmail}
                        onChangeText={this.onChangeMail.bind(this)} />
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput style={styles.textInput} placeholder="Şifre"
                        secureTextEntry={true} value={this.props.newPassword}
                        onChangeText={
                            value => this.props.user_Update({ prop: 'newPassword', value })} />
                </View>
                {this.renderError()}
                <TouchableOpacity style={styles.loginButton} onPress={this.onCreateUserPress.bind(this)}>
                    <Text style={styles.buttonText}>Kayıt Ol!</Text>
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
        alignItems: 'center',
    },
    header: {
        marginBottom: 25,
        fontSize: 40,
        color: 'rgba(10, 180, 190, 2))',
        fontWeight: 'bold',
        fontFamily: 'fantasy',
    },

    emailContainer: {
        width: 325,
        borderColor: '#CFD0D1',
        borderWidth: 2,
        height: 50,
        padding: 0,
        borderRadius: 20,
        borderBottomWidth: 0,
        backgroundColor: '#F5F6F7',
        marginBottom: 5,
    },
    passwordContainer: {
        width: 325,
        borderColor: '#CFD0D1',
        borderWidth: 2,
        height: 50,
        padding: 0,
        borderRadius: 20,
        borderBottomWidth: 0,
        backgroundColor: '#F5F6F7',
        marginTop: 5,
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#2980b9',
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 45
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#3300',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 5,
    },
    buttonDt: {
        width: 320,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    dogumText: {
        color: '#0682B8',
        fontSize: 15
    }
});
const mapStatetoProps = (state) => {
    const { newEmail, newPassword, dogumTarihi, tcno, ad, soyad,error,phoneNumber } = state.signUp;
    return { newEmail, newPassword, dogumTarihi, tcno, ad, soyad,error,phoneNumber };
};
//Diğer formlarda aynı şekilde gidicek!..
export default connect(mapStatetoProps, { user_Update , createNewUser})(CreateForm);