import {IDNO_CHANGED,PASSWORD_CHANGED,LOGIN_USER_SUCCESS,LOGIN_USER_FAIL,LOGIN_USER,
    CREATE_USER_PAGE, CREATE_USER_SUCCESS,USER_UPDATE,TOKEN_SAVE} from '../actions/types';


const INITIAL_STATE={idNo:'',password:'',user:null,error:'',loading:false,ad:'',soyad:'',tcno:'',dogumTarihi:'',phoneNumber:'', token:''};

export default (state=INITIAL_STATE,action)=>{  
    switch(action.type){
        case IDNO_CHANGED:
            return {...state, idNo:action.payload};
        case PASSWORD_CHANGED:
            return {...state, password:action.payload};
        case TOKEN_SAVE:
            return {...state, token:action.payload};
        case LOGIN_USER:
            return {...state, loading:true}; 
        case LOGIN_USER_SUCCESS:
            return { ...state,loading:false };
        case LOGIN_USER_FAIL:
            return {...state, error:'', loading:false};
        case CREATE_USER_PAGE:
            return {...state};
        case USER_UPDATE:
            return {...state, [action.payload.prop]:action.payload.value};
        case CREATE_USER_SUCCESS:
            return {INITIAL_STATE};
        default: 
            return state;
    }
};