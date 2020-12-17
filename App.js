import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import api from './api';
import DealList from './components/DealList';
import DealDetail from './components/DealDetail';

export default function App() {

  const [ deals, setDeals ] = useState([]);
  const [ currentDealId, setCurrentDealId ] = useState(null);

  useEffect(() => {
    (async () => {
      const deals = await api.fetchInitialDeals();
      setDeals(deals);
    })();   

  }, []);


  const getCurrentDeal = () => deals.find(deal => deal.key === currentDealId);

  return ( 
    <> 
      {
        currentDealId ? (
          <DealDetail deal={getCurrentDeal()} />
        ) : (
          <View style={styles.container}>
            {
              deals.length > 0 ? (
                <DealList deals={deals} onItemPress={setCurrentDealId} />
              ) : (          
                <Text style={styles.header}>BigSale App!</Text>          
              )
            }
          </View>
        )       
      }     
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
  }
});
