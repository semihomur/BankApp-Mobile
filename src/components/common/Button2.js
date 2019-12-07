import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button2 = ({ onPress, children, style }) => {
    return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
    <Text style={style}>{children}</Text>
    </TouchableOpacity>);
};

const styles = {
    buttonStyle: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        borderColor:'#9c9c9c'
    }
};
export {Button2};
