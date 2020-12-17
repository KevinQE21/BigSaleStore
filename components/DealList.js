import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default DealList = ({deals}) => {

    return (
        <View style={styles.list}>
            <FlatList data={deals} rendeItem={({item}) => 
                <Text>{item.title}</Text>
            } keyExtractor={item => item.key}/>
        </View>
    );
};


const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        flex: 1,
        width: '100%',
        paddingTop: 50,
    },
});