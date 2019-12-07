import {Alert, AsyncStorage} from 'react-native';
import {IDNO_CHANGED,PASSWORD_CHANGED,LOGIN_USER_SUCCESS,LOGIN_USER_FAIL,LOGIN_USER
    ,CREATE_USER_PAGE,USER_UPDATE, TOKEN_SAVE} from './types';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import moment from 'moment';
export const IdNoChanged = (text) => {
    return {
        type:IDNO_CHANGED,
        payload:text
    }; 
};
export const passwordChanged=(text) =>{
    return {
        type:PASSWORD_CHANGED,
        payload:text
    };
};
export const user_Update = ({prop,value}) => {
    return {
        type:USER_UPDATE,
        payload:{prop,value}
    };
};
/*_storeData = async (token) => {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', token);
      await AsyncStorage.setItem('@MySuperStore:nameid', token.nameid);
    } catch (error) {
      // Error saving data
    }
  };*/
export const loginUser=({idNo,password}) => {
    return (dispatch) => {
        dispatch({type:LOGIN_USER});
        axios.post(
            'http://10.0.2.2:61046/api/auth/login', 
            {
               tckno: idNo,
               password: password,
            },
            {
               headers: {
                   'Content-Type': 'application/json',
               }
            }
        )
          .then(res => {
              //_storeData(res.data.token);
              dispatch({type:LOGIN_USER_SUCCESS});
              dispatch({type:TOKEN_SAVE,payload: res.data.token});
              Actions.menu();
          })
          .catch(e=>{
              console.log(e);
              Alert.alert('Hata','TC Kimlik Numaranız veya şifreniz yanlış.');
              dispatch({type:LOGIN_USER_FAIL}); 
          });
    };
};
export const createUserPage=()=>{
    Actions.createUser();
    return {
        type:CREATE_USER_PAGE
    };
};

export const createNewUser=({newEmail,newPassword,dogumTarihi,tcno,ad,soyad,phoneNumber}) =>{
    return (dispatch) => {
    if(newEmail!=null && newPassword!=null && dogumTarihi!=null && tcno!=null && ad!=null && soyad!=null && newPassword.length>=6 && phoneNumber.length==11
        && tcno.length==11 && moment().diff(dogumTarihi, 'years')>=18){
            axios.post('http://10.0.2.2:61046/api/auth/register',{
                name: ad,
                surname:soyad,
                password: newPassword,
                mail:newEmail,
                phonenumber:phoneNumber,
                tckno:tcno,
                totalbalance:0,
                creditscore:0,
                dateofbirth:dogumTarihi,
                registrationtime:new Date()
            },{
                headers: {
                    'Content-Type': 'application/json',
                }
             })
            .then(res=>{
               // Actions.login();
                Alert.alert('Başarılı','Kayıt oluşturuldu.');
            })
            .catch(e=>{
                console.log(e);
                Alert.alert('Hata','Bu TC Kimlik Numarasına ait üyelik vardır'+e);                
            })
    }
    else
    Alert.alert("Hata!","Lütlen bilgileri doldurduğunuza,yaşınızın 18'den büyük olduğuna veya minumum 6 hanelik şifre girdiğinize emin olunuz.");
    }
}