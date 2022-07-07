import {
    FlatList,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    TouchableHighlight, TouchableOpacityComponent, Alert
} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {Component, useEffect, useState} from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import createStackNavigator from "react-native-screens/createNativeStackNavigator";
import RecettesScreen from "./RecettesScreen";
import {db} from "../firebase";

export default function RechercheScreen({navigation}) {
    const [search, setSearch] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [searchIngredients, setSearchIngredients] = useState([])
    const response2 = db.collection('Ingredient');
    const fetchBlogs=async()=> {
        const data = await response2.get();
        data.docs.forEach(ingredient => {
            setIngredients(ingredients => [...ingredients, ingredient.data()])
        })
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

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
                {ingredients && ingredients.filter((ingredient) => {
                    if(search == "") {
                        return ingredient;
                    } else if(ingredient.Nom.toLowerCase().startsWith(search.toLowerCase())) {
                        return ingredient;
                    }
                }).map((ingredient, key) => {
                    return (
                        <TouchableOpacity style={styles.item} key={key} onPress={() => {
                            setSearchIngredients(searchIngredients => [...searchIngredients, ingredient])
                        }}>
                            <Image style={styles.image} source={{uri: ingredient.Image}}/>
                            <Text style={styles.flatListTitle}> {ingredient.Nom} </Text>
                            <MaterialCommunityIcons name={"plus"} size={50} color={"#209209"}/>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

            <View style={styles.search}>
                <TouchableOpacity style={styles.button_div} onPress={() => {
                    navigation.navigate({
                        name: "Recettes",
                        params: searchIngredients,
                    })
                    // console.log("search ingredients : ", searchIngredients)
                }}>
                    <Text style={styles.button_title}>Rechercher une recette</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Recettes")}
                >
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
        // marginLeft: 60,
        textAlign: "center",
        flex: 1,
        flexWrap: "wrap",
    },
    image : {
        height: 100,
        width: 100,
    },
});