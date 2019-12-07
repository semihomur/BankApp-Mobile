import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
    return (
        <View style={styles.containerStyles}>{props.children}</View>
        //<Text>{props.album.title}</Text> childrenda ne varsa otomatik onu alır!!!
    );
};

const styles = {
    containerStyles: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 2,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elavation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
};
export { Card };
