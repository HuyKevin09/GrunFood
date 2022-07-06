import {StyleSheet, TextInput, Image, ScrollView} from 'react-native';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { SafeAreaView, FlatList, StatusBar,TouchableOpacity } from 'react-native';
import recettesJson from "../assets/data/recettes.json";
import Navigation from '../navigation';

import {auth, db} from '../firebase';
import firebase from '../firebase';

export default function RecettesScreen({navigation}) {
    const [search, setSearch] = useState("")

    const [recettes, setRecettes] = useState([])

    const user = firebase.default.auth().currentUser;
    const userDocument = db.collection("Utilisateur").doc(user?.uid)
    const [userDetails, setUserDetails] = useState('')

    const fetchBlogs=async()=>{

        // const response =await userDocument
        // response.get().then(snapshot => setUserDetails(snapshot.data()))

        // const response2=db.collection('Recette');
        // const dataRecette = await response2.get()

        // if (userDetails["regime_alimentaire"] == "vegan"){
        //     dataRecette.docs.forEach(recipe => {
        //         const [regimeCorrect, setRegimeCorrect] = useState(true)
        //         const fetchBlogs2=async()=>{
        //             const ingredientDocument = response2.doc(recipe.id).collection('Ingredients')
        //             const dataIngredient = await ingredientDocument.get() 
        //             dataIngredient.docs.forEach(ingredient => {
        //                 if (ingredient.data().)
        //                 setIngredients(ingredients => [...ingredients, ingredient.data()])
        //             })
        //         }
        //         fetchBlogs2()
        //     })
        // }


        const response2=db.collection('Recette');
        const data=await response2.get();
            data.docs.forEach(recette => {
                setRecettes(recettes => [...recettes,recette.data()])
            })
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <TextInput
                        placeholder="Rechercher une recette"
                        style={styles.textInput}
                        onChangeText={(search) => setSearch(search)}
                    />
                </View>

                <ScrollView style={{width: "100%"}}>
                    {
                    recettes && recettes.filter((recette) => {
                        if(search == "") {
                            return recette;
                        } else if(recette.Nom_recette.toLowerCase().startsWith(search.toLowerCase())) {
                            return recette;
                        } else if(recette.culture.toLowerCase().startsWith(search.toLowerCase())) {
                            return recette;
                        }
                    })
                        .map((recette, key) =>{
                        // console.log(recette)
                        return(
                            <TouchableOpacity key={key} style={styles.item} onPress={() => navigation.navigate(
                                {
                                    name: "RecetteIndividuelle",
                                    params: recette,
                                })}>
                                <Text style={styles.title2}>{recette.Nom_recette}</Text>
                                <Text style={styles.title3}>Score Pollution : {recette.indice_de_pollution}</Text>
                                <Text style={styles.title2}>Culture : {recette.culture}</Text>
                                <Image style={styles.image} source = {{uri : recette.Image}}/>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>

            </View>
        </ScrollView>
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
        backgroundColor: '#F5F3F3',
        width: '90%',
        height: 30,
        borderColor: '#e8e8e8',
        borderWidth: 3,
        borderRadius: 10,
        paddingHorizontal: 10,
    },

    item:{
        backgroundColor: '#ECF9EE',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        width: '90%',
        borderRadius: 15,
    },
    title2: {
        textAlign: "center",
        fontSize: 18,
        marginTop:12,
    },
    title3: {
        textAlign: "center",
        fontSize: 13,
        marginTop:12,
        marginBottom: 13,
    },
    textInput: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#000000",
        borderRadius: 10,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 18,
        paddingTop: 6,
        paddingBottom: 6,
        marginTop: "3%",
    },
    image: {
        width: "100%",
        height: 300,
    }
});