import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import api from './api';
import DealList from './components/DealList';
import DealDetail from './components/DealDetail';
import SearchBar from './components/SearchBar';

export default function App() {

  const [ deals, setDeals ] = useState([]);
  const [ currentDealId, setCurrentDealId ] = useState(null);
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    (async () => {
      const deals = await api.fetchInitialDeals();
      setDeals(deals);
    })();  
  }, []);


  const getCurrentDeal = () => deals.find(deal => deal.key === currentDealId);

  const unsetCurrentDealId = () => setCurrentDealId(null);

  const searchHandle = (text) => setQuery(text);

  //Filter() => recibe una funcion, para que cada vez que retorma el verdadero tome en cuenta el item en falso no

  return ( 
    <> 
      {
        currentDealId ? (
          <DealDetail deal={getCurrentDeal()} onBack={unsetCurrentDealId} />
        ) : (
          <View style={styles.container}>
            {
              deals.length > 0 ? (
                <View style={styles.main}>
                  <SearchBar onChange={searchHandle} />
                  <DealList deals={deals.filter( deal =>{
                    return (
                      deal.cause.name.includes(query) ||
                      deal.title.includes(query)
                    );
                  })} onItemPress={setCurrentDealId} />    
                </View>                
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
  main: {
    marginTop: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
  }
});
