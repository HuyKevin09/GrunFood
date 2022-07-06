import { StyleSheet,StatusBar, Button, TouchableOpacity, FlatList,ScrollView,} from 'react-native';

import { Ionicons } from '@expo/vector-icons'; 
import { Text, View, } from '../components/Themed';
import {useState, useEffect} from "react";

import firebase from '../firebase';
import {db} from '../firebase';

export default function AllergenesScreen({navigation} : RootStackScreenProps<'Root'>) {

    const chooseAllergene = () => {
        console.log('Choix allergene fait');
        const user = firebase.default.auth().currentUser;
        const userDocument = db.collection("Utilisateur").doc(user?.uid).update({
                Allergene: allergene,
            });
        navigation.replace("Root");
   }

   const [listeAllergenes, setListeAllergenes] = useState([])

    const fetchBlogs=async()=>{
        const response=db.collection('Ingredient');
        const data=await response.get();
        data.docs.forEach(ingredient => {
            if (ingredient.data().Type_allergene == "allergène") {
                setListeAllergenes(listeAllergenes => [...listeAllergenes,ingredient.data().Nom])}
                // console.log(ingredient.data().Nom)
        })        
        // console.log(listeAllergenes)
    }

    useEffect(() => {
        fetchBlogs();
    }, [])



    const [allergene, setAllergene]= useState('')

    const Item = ({ item, onPress}) => (
        <TouchableOpacity onPress={onPress}>
        <View style={[styles.item, {backgroundColor : item === allergene ? "#209209" : "#f5f5f5"}]}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor : item === allergene ? "#209209" : "#f5f5f5"}}>
                <Text>{item}</Text>
            </View>
        </View>
        </TouchableOpacity>
      );
    
    const renderItem = ({ item }) => {
        return(
            <Item 
                item={item}
                onPress = {() => 
                    setAllergene(item)}
            />
        )
    };
    
    return (
        <ScrollView style={styles.scrollview}>
            <TouchableOpacity style = {{alignItems: 'flex-end', position: 'absolute', width: "100%", marginTop: 45, paddingRight: 15,}} onPress={chooseAllergene}>
                <Ionicons name="md-checkmark-circle-outline" size={40} color="green"/>
            </TouchableOpacity>
            <View style = {styles.text}>
                <Text style={styles.title}>Vos préférences</Text>
                <Text style={styles.subtitle}> Quels sont vos allergènes? </Text>
            </View>

            <View style={styles.flatlist}>
                <FlatList
                    data={listeAllergenes}
                    renderItem={renderItem}
                    // keyExtractor={item => item.id}
                    extraData={setAllergene}
                />
            </View>
        </ScrollView>
);
}

const DATA = [
    {
        id: '0',
        title :'Arachide',
        selected : false,
    },
    {
        id: '1',
        title:'Céleri',
        selected : false,
    },
    {
        id: '2',
        title : 'Fruits à coques',
        selected : false,
    },
    {
        id: '3',
        title : 'Crustacés',
        selected : false,
    },{
        id: '4',
        title : 'Soja',
        selected : false,
    },{
        id: '5',
        title : 'Gluten',
        selected : false,
    },{
        id: '6',
        title : 'Oeufs',
        selected : false,
    },{
        id: '7',
        title : 'Moutarde',
        selected : false,
    },{
        id: '8',
        title : 'Céréales',
        selected : false,
    },{
        id: '9',
        title : 'Graine de Sésame',
        selected : false,
    },
  ];



const styles = StyleSheet.create({
    scrollview : {
        backgroundColor: "white", 
        height: "100%"
    },
    text : {
        alignItems: 'center',
        position: 'relative',
    },
    container: {
        flex: 1,
    },
    title: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 25,
        lineHeight: 48,
        top: 40,
        color: "#868585",
        position: 'absolute',
    },
    subtitle : {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 30,
        top: 95,
        color: "#868585",
    },

    // FLATLIST
    flatlist : {
        top: 120,
        position : 'relative',
        marginBottom: 150,
    },
    flatlistcontainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
    item: {
        backgroundColor: "#f5f5f5",
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15,
        width: "90%",
      },
    flatlisttitle: {
        fontSize: 20,
      },
});