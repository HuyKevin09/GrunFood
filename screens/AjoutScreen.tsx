import {Button, ScrollView, StyleSheet, TextInput} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {Component, useState} from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function AjoutScreen() {
    return (
        <View style={styles.container}>

            <Searchbar/>

            <View style={styles.ingredients_div}>
                <Text style={styles.title}>Vos ingrédients</Text>
                <ScrollView style={styles.ingredients}>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                    <Text style={styles.title}>Je rigole</Text>
                </ScrollView>
            </View>

            <View style={styles.button_div}>
                <Button
                    title={"Rechercher une recette"}
                    color={"#FFFFFF"}
                />
            </View>

            <View style={styles.button_div}>
                <Button
                    title={"Ajouter dans consommation"}
                    color={"#FFFFFF"}
                />
            </View>
        </View>
);
}

const Searchbar = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    // let clicked = false
    // if(!clicked) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder={"Entrez le nom de vos ingrédients"}
                // onPressIn={() => {
                //     clicked = true
                // }}
                // onPressOut={() => {
                //     clicked = false
                // }}
            >
            </TextInput>
        </View>
    )
    // }
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
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    textInput: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#209209",
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
        borderColor: "#209209",
        height: "70%",
        width: "90%",
    },
    button_div: {
        borderStyle: "solid",
        backgroundColor: "#209209",
        borderRadius: 20,
        margin: 2,
    },
    ingredients: {
        backgroundColor: "red",
    },
});
