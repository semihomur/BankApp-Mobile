import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
    <Text style={styles.textStyle}>{children}</Text>
    </TouchableOpacity>);
};

const styles = {
    buttonStyle: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#9c9c9c',
        borderRadius: 5,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        marginLeft: 5,
        marginRight: 5
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }
};
export {Button};
