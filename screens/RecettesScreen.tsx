import {StyleSheet, TextInput, Image, ScrollView} from 'react-native';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {Feather} from '@expo/vector-icons';
import { useState } from "react";
import { SafeAreaView, FlatList, StatusBar,TouchableOpacity } from 'react-native';


export default function RecettesScreen({navigation} : RootTabScreenProps<'Root'>) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Recettes</Text>
                <SearchBar></SearchBar>
                <View style={{width: '100%'}}>
                    <App></App>
                </View>
            </View>
        </ScrollView>
    );
}

const SearchBar = () => {

    return (
        <View style ={styles.searchbar}>
            <TextInput placeholder="Rechercher une recette" style={{fontSize:20}}/>
        </View>

    )
}

const DATA = [
    {
        id: '0',
        image: 'https://img.cuisineaz.com/660x660/2022/02/23/i183013-couscous-marocain.jpeg',
        indice_pollution: 'Indice de pollution : 15.3',
        title: 'Coucous avec légumes ',
    },
    {
        id: '1',
        image: 'https://img.cuisineaz.com/660x660/2013/12/20/i27245-recette-de-fajitas.jpeg',
        indice_pollution: 'Indice de pollution  : 10.2',
        title: 'Fajitas aux légumes',
    },
    {
        id: '2',
        image: 'https://www.academiedugout.fr/images/15619/948-580/fotolia_62611439_subscription_l.jpg?poix=50&poiy=50',
        indice_pollution: 'Indice de pollution  : 21.4',
        title: 'Riz au lait',
    },
    {
        id: '3',
        image: 'https://cdn.pratico-pratiques.com/app/uploads/sites/3/2019/11/27115447/salade-de-fruits.jpg',
        indice_pollution: 'Indice de pollution  : 9.9',
        title: 'Salade de fruit',
    },
];

const Item = ({ item, backgroundColor, textColor, navigation}) => (
    <TouchableOpacity style={[styles.item, backgroundColor]} onPress={() => navigation.replace('RecetteIndividuelle')}>
        <Text style={[styles.title2, textColor]}>{item.title}</Text>
        <Text style={[styles.title3, textColor]}>{item.indice_pollution}</Text>
        <Image style={{height: 300, width: 300}} source = {{uri : item.image}}/>

    </TouchableOpacity>
);

const App = () => {
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#ECF9EE" : "#ECF9EE";
        const color = item.id === selectedId ? 'black' : 'black';

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
        backgroundColor: '#F5F3F3',
        width: '90%',
        height: 30,
        borderColor: '#e8e8e8',
        borderWidth: 3,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },

    item:{
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        width: '90%',
        borderRadius: 15,
    },
    title2: {
        fontSize: 18,
        marginTop:12,
    },
    title3: {
        fontSize: 13,
        marginTop:12,
        marginBottom: 13,
    },


});