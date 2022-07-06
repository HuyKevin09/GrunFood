import {Button, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {RootStackScreenProps} from "../types";

import React, {useEffect} from 'react';
import {auth, db} from '../firebase';
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function ProfilScreen({navigation} : RootStackScreenProps<'Connexion'>) {
    
    const handleSignOut = () => {
        auth
            .signOut()
            .then( () => {
                navigation.replace("Connexion")
            })
    }
    
    const user = firebase.default.auth().currentUser;
    const userDocument = db.collection("Utilisateur").doc(user?.uid)
    const [userDetails, setUserDetails] = useState('')
    // console.log(userDocument)
    const fetchBlogs=async()=>{
        const response =await userDocument
        const name = response.get().then(snapshot => setUserDetails(snapshot.data()))
        console.log(userDetails)
        
        // console.log(name.doc(user?.uid).data["nom"])
    }

    useEffect(() => {
        fetchBlogs();
    }, [])
    //{userDetails["nom"]}, , {userDetails["Allergene"]}, {userDetails["regime_alimentaire"]}, {userDetails["num_telephone"]}

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Image source={require("../assets/images/favicon.png")} style={styles.picture}/>
                <Text style={styles.name}>Nom</Text>

                <View style={styles.info}>
                    <Text style={styles.titles}>Informations personnelles</Text>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name={"email-outline"} size={30}/>
                        <Text> Email : {auth.currentUser?.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name={"phone-outline"} size={30}/>
                        <Text>Numero de telephone :  </Text>
                    </View>
                </View>

                <View style={styles.info}>
                    <Text style={styles.titles}>Informations personnelles</Text>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name={"silverware-fork-knife"} size={30}/>
                        <View style={styles.col}>
                            <Text>Allergènes</Text>
                            <Text>ALL</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name={"noodles"} size={30}/>
                        <View style={styles.col}>
                            <Text>Régime</Text>
                            <Text>Reg</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.button_title}>Modifier votre profil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                    <Text style={styles.button_title}>Déconnexion</Text>
                </TouchableOpacity>
                {/*<Button title={"Modifier votre profil"}/>*/}
                {/*<Button title={"Déconnexion"}/>*/}
            </View>
        </ScrollView>
    );
}

const DropDown = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    return (
        <View style={styles.container}>
            <DropDownPicker
                setValue={setValue}
                value={value}
                items={[
                    {label: "Végétarien", value: "vegetarien"},
                    {label: "Végan", value: "vegan"},
                    {label: "Pesco-végétarien", value: "pv"},
                    {label: "Flexitarien", value: "flexitarien"},
                    {label: "Sans gluten", value: "gluten"},
                    {label: "Sans lactose", value: "lactose"},
                ]}
                placeholder={"Sélectionnez votre type d'alimentation"}
                open={open}
                setOpen={setOpen}
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
                containerStyle={{
                    marginTop: 50,
                    width: 300,
                    height: 100,
                }}
                labelStyle={{
                    fontSize: 20,
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
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
    picture: {
        height: 100,
        width: 100,
        borderRadius: 100,
        marginTop: 15,
        marginBottom: 15,
    },
    name: {
        fontSize: 26,
        marginBottom: 15,
    },
    info: {
        borderStyle: "solid",
        borderWidth: 1,
        width: "90%",
        marginBottom: 15,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowColor: "#000000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
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
    col: {
        flexDirection: "column",
        marginLeft: 8,
        marginBottom: 5,
    },
    button: {
        justifyContent: "center",
        backgroundColor: "#209209",
        width: "80%",
        height: "7%",
        margin: 5,
        marginBottom: 10,
        borderRadius: 20,
    },
    button_title: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 25,
    }
});