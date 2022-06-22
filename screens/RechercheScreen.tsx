import {FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {Component, useState} from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function RechercheScreen() {
    return (
        <View style={styles.container}>

            <Searchbar/>

            <View style={styles.ingredients_div}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={<Text style={styles.title}>Vos ingrédients</Text>}
                    />
            </View>

            <View style={styles.search}>
                <TouchableOpacity style={styles.button_div}>
                    <Text style={styles.button_title}>Rechercher un recette</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <MaterialCommunityIcons name={"upload-outline"} size={40} color={"#209209"} style={styles.upload}/>
                </TouchableOpacity>
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

const renderItem = ({ item }) => {
    return(
        <Item
            item={item}
        />
    )
};

const DATA = [
    {
        id: '0',
        image: "https://www.jardiprix.com/images/Image/TOMATE-GREFFEE-FELICIA-POT-DE-1L-300666.jpg",
        ingredient : "Tomates",
        categorie : "Fruits",
        quantite : "5",
        unite : "kg",
    },
    {
        id: '1',
        image: "http://www.companionetmoi.com/images/ingredients/carotte.jpg",
        ingredient : "Carottes",
        categorie : "Légumes",
        quantite : "3",
        unite : "kg",
    },
    {
        id: '2',
        image: "https://www.academiedugout.fr/images/9582/370-274/ffffff/fotolia_59270770_subscription_xl.jpg?poix=50&poiy=50",
        ingredient : "Farine",
        categorie : "Féculents",
        quantite : "1.5",
        unite : "kg",
    },
];

const Item = ({item}) => (
    <TouchableOpacity style={styles.item}>
        <Image style={styles.image} source = {{ uri: item.image}}/>
        <View style={{alignItems: "center", flexDirection:'row', backgroundColor: "#F5F5F5"}}>
            <Text style={styles.flatListTitle}>{item.ingredient}</Text>
            <MaterialCommunityIcons name={"plus"} size={50} color={"#209209"}/>
        </View>
    </TouchableOpacity>
);

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
