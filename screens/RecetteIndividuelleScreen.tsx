import React from 'react';
import {StyleSheet, Image, ScrollView} from 'react-native';
import { SafeAreaView, FlatList, StatusBar } from 'react-native';
import {Text, View} from '../components/Themed';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import firebase from '../firebase';
import {db} from '../firebase';

export default function RecetteIndividuelleScreen() {

  const chooseAllergene = () => {
    console.log('Choix allergene fait');
    const user = firebase.default.auth().currentUser;
    const userDocument = db.collection("Preference").doc(user?.uid).update({
            Allergene: allergene,
        });
}

    return (
        <ScrollView>
        <View style={styles.container}>
            <Image style={{height: 200, width: 360, marginTop: 10,borderRadius: 15}} source = {{uri : 'https://img.cuisineaz.com/660x660/2013/12/20/i27245-recette-de-fajitas.jpeg'}}/>
        
            <View style={styles.info2}>
                    <Text style={styles.title2}>Couscous aux légumes</Text>
                    <View style={styles.row}>
                    <Text style = {{textAlign:'center', marginLeft: 30, marginBottom: 3}}> IP : 5 | Prép : 40 min</Text>
                    </View>
           </View> 
            <View>
                <Text> </Text>
            
                <MaterialCommunityIcons
                  name="heart-circle"
                  color={'#209209'}
                  size={25}
                  style={{position: 'absolute', right:120, marginTop: 4, fontSize: 30}}
                 />
                
                <MaterialCommunityIcons
                  name="food-fork-drink"
                  color={'#209209'}
                  size={25}
                  style={{position: 'absolute', left:120, marginTop: 4, fontSize: 30}}
                 />
            </View>

            <View style={styles.info}>
                    <Text style={styles.titles}>Ingrédients</Text>
                    <View style={styles.row}>
                    <App></App>
                    </View>
           </View>
           <View style={styles.info}>
                    <Text style={styles.titles}>Préparation</Text>
                    <View style={styles.row}>
                    <Text>Faire Nkedie efhiehf ueoezbf fzuhuv uzehfuz hdodzbdc chcufizfzibc Faire Nkedie efhiehf ueoezbf fzuhuv uzehfuz hdodzbdc chcufizfzibc</Text>
                    </View>
           </View>

     

        </View>
        
        </ScrollView>
);
}

const DATA = [
    {
        id: '0',
        ingredient : "Tomates",
        quantite : "5",
        unite : "kg",
    },
    {
        id: '1',
        ingredient : "Carottes",
        quantite : "3",
        unite : "kg",
    },
    {
        id: '2',
        ingredient : "Farine",
        quantite : "1.5",
        unite : "kg",
    },
  ];




  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.ingredient}>{item.quantite} {item.unite} {item.ingredient}</Text>
     
    </View>
  );

const App = () => {
    const renderItem = ({ item }) => (
      <Item item={item} />
    );
    return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      );
    }
    
     
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: 'white',
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
    info: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        width: "90%",
        marginBottom: 15,
        marginTop: 30,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowColor: "#000000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
    },
    info2: {
      borderStyle: "solid",
        borderWidth: 1,
        borderColor: 'white',
        opacity : 0.8,
        borderRadius: 10,
        width: "55%",
        position: 'absolute',
        top: 138,
        marginBottom: 15,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowColor: "#000000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
    },
    title2:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 5,
        padding : 5,
    },
    titles: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 5,
        marginLeft: 8,
        marginBottom: 5,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 8,
        marginBottom: 5,
    },
    item: {
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 16,
  
      },
      ingredient:{
        fontSize: 15,
      },
      quantite:{
        fontSize: 12,
    },

});

