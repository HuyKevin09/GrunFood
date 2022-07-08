import { StyleSheet, TextInput, ScrollView, StatusBar, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { Text, View } from '../components/Themed';

import { Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons'

import feed from '../assets/data/feed'

import {db} from '../firebase';
import firebase from '../firebase';
import React,{useState,useEffect} from 'react';
import Navigation from '../navigation';

export default function FavorisScreen({navigation}) {

    const [recettes, setRecettes] = useState([])
    const [indices, setIndices] = useState([0])

    const fetchBlogs=async()=>{
        const user = firebase.default.auth().currentUser;
        const response=db.collection('HistoriqueFavBd').doc(user?.uid).collection('Recette');
        const data=await response.get();
        // console.log(recettes)
        data.docs.forEach(recette => {
            setRecettes(recettes => [...recettes,recette.data()])
            // console.log(recette.data().ID_recette)
        }
        );     
    }
    {     
        useEffect(() => {
            fetchBlogs()
        }, [])
        }
    return (
        <ScrollView>
            <View style= {styles.container}>
                <Text style={styles.titre}>Mes Favoris</Text>
                {
                    recettes && recettes.map(recette=>{
                        // console.log(recette)
                    return(
                        <View>
                            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(
                                {
                                    name: "RecetteIndividuelleFavoris",
                                    params: recette
                                })}>
                            <Image style={styles.image} source = {{uri : recette["Image"]}}/>
                            <View style={{alignItems: 'center', justifyContent: 'center', flexDirection:'column', backgroundColor: "#f5f5f5"}}>
                                <Text style={styles.flatListTitle}>{recette["Nom_recette"]}</Text>
                                <Text style={styles.quantite}> IP : {recette["indice_de_pollution"]} </Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                        )
                    })
                }
            </View>

        </ScrollView>
    );
}

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(181, 181, 181, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    useShadowColorFromDataset: false // optional
};


const styles = StyleSheet.create({
    container : {

    },
    titre: {
        marginTop: 50,
        marginBottom: 30,
        textAlign: 'center',
        fontStyle: 'normal',
        fontSize: 40,
        lineHeight: 40,
        color: "#868585",
    },
    item: {
        backgroundColor: "#f5f5f5",
        padding: 20,
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    image : {
        height: 100,
        width: 100,
    },
    flatListTitle: {
        fontSize: 15,
        textAlign: "center",
    },
    separator : {
        marginVertical : 30,
        height : 1,
        width : '80%',
    },
    scrollView: {
        //height:1000,
    },
    quantite : {
        fontSize: 15,
        marginLeft: 60,
        marginTop:5,
    }
});
