import {StyleSheet, TextInput, Image, ScrollView} from 'react-native';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {Feather} from '@expo/vector-icons';
import { useState } from "react";
import { SafeAreaView, FlatList, StatusBar,TouchableOpacity } from 'react-native';

/*var logo = require('../assets/images/Logo.png');*/

export default function RecettesScreen({navigation} : RootTabScreenProps<'Recettes'>) {
    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>Recettes</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <SearchBar></SearchBar>
           <View style={{width: '80%'}}>
                <Text> Bonjour hello</Text>
                <App></App>
           </View>
          
       
        
        </View>
        </ScrollView>
    );
}

const SearchBar = () => {
    
    return (
        <View style ={styles.searchbar}>
            <Feather name="search" size={20} />
            <TextInput 
                placeholder="Rechercher une recette"
            />
        </View>

    )
}

const DATA = [
    {
      id: '0',
      image: 'https://www.hervecuisine.com/wp-content/uploads/2020/03/recette-pa%CC%82tes-au-thon-730x520.jpg.webp',
      indice_pollution: '15.3',
      title: 'First Item MFZELfzejfoizehfohzefzefrgergrzg',
    },
    {
      id: '1',
      image: 'https://img.cuisineaz.com/660x660/2013/12/20/i27245-recette-de-fajitas.jpeg', 
      indice_pollution: '10.2',
      title: 'Second Itemfzefzegzrgrg',
    },
  ];
  
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title2, textColor]}>{item.title}</Text>
    <Image style={{height: 300, width: 300}} source = {require('../assets/images/Logo.jpg')}/>
  </TouchableOpacity>
  );

  const App = () => {
    const [selectedId, setSelectedId] = useState(null);
    
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';
    
    return (
        <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    ); 
  };
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData ={selectedId}
        />
      </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    searchbar: {
        backgroundColor: 'white', 
        width: '95%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },

    item:{
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        width: '90%',
    },
    title2: {
        fontSize: 15,
        marginTop:15,
    },
    
    
   
});