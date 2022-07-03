import {StyleSheet, TextInput, Image, ScrollView} from 'react-native';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import { useState } from "react";
import { SafeAreaView, FlatList, StatusBar,TouchableOpacity } from 'react-native';
import recettes from "../assets/data/recettes.json";


export default function RecettesScreen() {
    const [search, setSearch] = useState("")
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
                    {recettes.filter((recette) => {
                        console.log("Search : " + search)
                        if(search == "") {
                            console.log(recette.Nom)
                            return recette;
                        } else if(recette.Nom.toLowerCase().includes(search.toLowerCase())) {
                            return recette;
                        }

                    }).map((val, key) => {
                        return (
                            <TouchableOpacity style={styles.item} key={key}>
                                <Text style={styles.title2}>{val.Nom}</Text>
                                <Text style={styles.title3}>IP : {val.Indice}</Text>
                                <Text style={styles.title2}>Culture : {val.Culture}</Text>
                                <Image style={styles.image} source = {{uri : val.Image}}/>
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