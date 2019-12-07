import React from 'react';
import {Router,Scene} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import CreateForm from './components/CreateForm';
import Menu from './components/Menu';
import Operations from './components/Operations';
import MoneyTransactions from './components/MoneyTransactions';
import PayBill from './components/PayBill';
import EstimateCredit from './components/EstimateCredit';

const RouterComponent = () =>{
    return(
        <Router>
            <Scene key="root">
                <Scene key="login" component={LoginForm} hideNavBar={true} />
                <Scene key="createUser" component={CreateForm} hideNavBar={true}/>
                <Scene key="menu" component={Menu} hideNavBar={true}/>
                <Scene key="operations" component= {Operations} hideNavBar={true} />
                <Scene key="transactions" component= {MoneyTransactions} hideNavBar={true} />
                <Scene key="paybill" component= {PayBill} hideNavBar={true} />
                <Scene key="estimatecredit" component= {EstimateCredit} hideNavBar={true} />
            </Scene>
        </Router>
    );
};

export default RouterComponent;