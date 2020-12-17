import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DealItem from './DealItem';

export default DealList = ({deals, onItemPress}) => {

    return (
        <View style={styles.list}>
            <FlatList data={deals} rendeItem={({item}) => 
                <DealItem deal={item} onPress={onItemPress}/>
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