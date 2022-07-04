import {FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {Component, useState, useEffect} from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import createStackNavigator from "react-native-screens/createNativeStackNavigator";
import RecettesScreen from "./RecettesScreen";
import ingredients from "../assets/data/ingredients.json"
import {NavigationContainer} from "@react-navigation/native";
import ConnexionScreen from "./ConnexionScreen";
import InscriptionScreen from "./InscriptionScreen";
import RegimeScreen from "./RegimeScreen";
import AllergenesScreen from "./AllergenesScreen";
import RecetteIndividuelleScreen from "./RecetteIndividuelleScreen";
import ProfilScreen from "./ProfilScreen";
import * as React from "react";
import vision from "@react-native-firebase/ml-vision"
import ml from "@react-native-firebase/ml"
import {CameraOptions, launchCamera, launchImageLibrary} from "react-native-image-picker";
import {any} from "@tensorflow/tfjs";
import {NativeEventEmitter} from "react-native";
import db from '../firebase';


export default function RechercheScreen( {navigation} ) {
    const [search, setSearch] = useState("")
    const [recettes, setRecettes]=useState([])
    const fetchBlogs=async()=>{
        const response=db.collection("Recettes")
        const data=await response.get();
        data.docs.forEach(item=>{
            setBlogs([...blogs,item.data()])
        })
    }

    return (
        <View style={styles.container}>

            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder={"Entrez le nom de vos ingrédients"}
                    onChangeText={(search) => setSearch(search)}
                >
                </TextInput>
            </View>

            <ScrollView style={styles.ingredients_div}>
                {ingredients.filter((ing) => {
                    if(search == "") {
                        return ing;
                    } else if(ing.name.toLowerCase().startsWith(search.toLowerCase())) {
                        return ing;
                    }

                }).map((val, key) => {
                    return (
                        <TouchableOpacity style={styles.item} key={key}>
                            <Image style={styles.image} source={{uri: val.image}}/>
                            <View style={{alignItems: "center", flexDirection:'row', backgroundColor: "#F5F5F5"}}>
                                <Text style={styles.flatListTitle}> {val.name} </Text>
                                <MaterialCommunityIcons name={"plus"} size={50} color={"#209209"}/>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

            <View style={styles.search}>
                <TouchableOpacity style={styles.button_div} onPress={() => navigation.navigate("Recettes")}>
                    <Text style={styles.button_title}>Rechercher une recette</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <MaterialCommunityIcons name={"upload-outline"} size={40} color={"#209209"} style={styles.upload}/>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-start",
        marginTop: 10,

    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',
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
    },
    ingredients_div: {
        top: 65,
        position: "absolute",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#000000",
        height: "70%",
        width: "90%",
    },
    button_div: {
        borderStyle: "solid",
        backgroundColor: "#209209",
        borderRadius: 20,
        marginBottom: 25,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    ingredients: {
        // backgroundColor: "red",
    },
    upload: {
        marginLeft: 40,
    },
    button_title: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 20,
        padding: 5,
    },
    search: {
        flexDirection: "row",
        justifyContent: "center",
    },
    item: {
        backgroundColor: "#f5f5f5",
        padding: 20,
        borderRadius: 15,
        borderTopColor: "#000000",
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: "center",
        // justifyContent: "center",
    },
    flatListTitle: {
        fontSize: 20,
        marginLeft: 60,
    },
    image : {
        height: 100,
        width: 100,
    },
});