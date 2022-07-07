import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView, FlatList, StatusBar } from 'react-native';
import {Text, View} from '../components/Themed';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import firebase from '../firebase';
import {db} from '../firebase';

export default function RecetteIndividuelleScreen({route}) {

const [ingredients, setIngredients] = useState([])
const [procedures, setProcedures] = useState([])

const fetchBlogs=async()=>{
    const response=db.collection('Recette');
    const data=await response.get();
    data.docs.forEach(recipe => {
        if (recipe.data().ID == route.params.ID) {
            // console.log(recipe.id)
            const fetchBlogs2=async()=>{
                const ingredientDocument = response.doc(recipe.id).collection('Ingredients')
                const dataIngredient = await ingredientDocument.get() 
                //console.log(dataIngredient.docs)
                dataIngredient.docs.forEach(ingredient => {
                    setIngredients(ingredients => [...ingredients, ingredient.data()])
                })

                const proceduresDocument = response.doc(recipe.id).collection('Procedure')
                const dataProcedure = await proceduresDocument.get() 
                dataProcedure.docs.forEach(procedure => {
                    setProcedures(procedures => [...procedures, procedure.data()])
                })

            }
            fetchBlogs2()
        }
    })
}

useEffect(() => {
    fetchBlogs();
}, [])

// POUR LES INGREDIENTS

const App = () => {
    const renderItem = ({ item }) => (
      <Item item={item} />
    );
    return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={ingredients}
            renderItem={renderItem}
            keyExtractor={item => item.Nom}
          />
        </SafeAreaView>
      );
    }

    const Item = ({ item }) => (
        <View style={styles.item}>
          <Text style={styles.ingredient}>{item.quantite} {item.Nom}</Text>
        </View>
      );


    // POUR LES PROCEDURES

    const App2 = () => {
        const renderItem2 = ({ item }) => (
          <Item2 item={item} />
        );
        return (
            <SafeAreaView style={styles.container}>
              <FlatList
                data={procedures}
                renderItem={renderItem2}
              />
            </SafeAreaView>
          );
        }
    
        const Item2 = ({ item }) => (
            <View style={styles.item}>
              <Text style={styles.ingredient}>{item.etape1}</Text>
              <Text style={styles.ingredient}>{item.etape2}</Text>
            </View>
          );

    return (
      <ScrollView>
          <View style={styles.container}>
              <Image style={styles.image} source = {{uri : route.params.Image}}/>

                <View style={styles.info2}>
                      <Text style={styles.title2}> {route.params.Nom_recette} </Text>
                      <View style={styles.row1}>
                          <Text style = {styles.pollu}>IP : {route.params.indice_de_pollution}</Text>
                          <Text style = {styles.pollu}>Temps : {route.params.temps_preparation}</Text>
                      </View>
                </View>

                <View>
                    <TouchableOpacity style = {styles.icon1} onPress={() => {
                        console.log(procedures)
                    }}>
                        <MaterialCommunityIcons
                            name="heart-circle"
                            color={'#209209'}
                            size={54}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity style ={styles.icon2} onPress={() => {
                        // console.log(ingredients)
                        const user = firebase.default.auth().currentUser;
                        const userDocument = db.collection("HistoriqueHebd").doc(user?.uid).collection("Recette").add({
                            date: new Date(),
                            image_recette: route.params.Image,
                            indice_de_pollution: route.params.indice_de_pollution,
                            nom_recette: route.params.Nom_recette,
                        });
                        Alert.alert("Recette ajoutée à la consommation !");
                    }}>
                        <MaterialCommunityIcons
                            name="food-fork-drink"
                            color={'#FFFFFF'}
                            size={40}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.info}>
                        <Text style={styles.titles}>Ingrédients</Text>
                        <View style={styles.row}>
                        <App></App>
                        </View>
               </View>
               <View style={styles.info3}>
                        <Text style={styles.titles}>Préparation</Text>
                        <View style={styles.row}>
                        <App2></App2>
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
        marginTop: "15%",
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
    info3: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        width: "90%",
        marginBottom: 15,
        marginTop: "5%",
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
    row1: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 5,
        justifyContent: "center",
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
    pollu: {
      // textAlign:'center',
      // marginLeft: 30,
      marginBottom: 3,
        fontWeight: "bold",
    },
    image: {
        height: 200,
        width: 360,
        marginTop: 10,
        borderRadius: 15
    },
    icon1: {
        position: 'absolute',
        right:120,
        marginTop: 4,
        // fontSize: 30,
    },
    icon2: {
        position: 'absolute',
        left:120,
        marginTop: 4,
        fontSize: 30,
        backgroundColor: "#209209",
        borderRadius: 100,
        padding: 4,
    },
});

