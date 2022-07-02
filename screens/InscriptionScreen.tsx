import React, {useState} from "react";
import { StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {auth} from '../firebase';
import firebase from '../firebase'
import database from '../firebase'


import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Text, View, } from '../components/Themed';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {RootStackScreenProps} from "../types";

export default function InscriptionScreen({navigation} : RootStackScreenProps<'Root'>) {
    const [email, setEmail] = useState('')
    const [motDePasse, setmotDePasse] = useState('')
    const [name, setName] = useState('')
    const [telephone, setTelephone] = useState('')

    const handleSignUp = () => {
        auth 
            .createUserWithEmailAndPassword(
                   email,
                   motDePasse)
            .then(() => {
                navigation.replace("Connexion");
                const user = firebase.auth().currentUser;
                console.log('Registered with:', user.email);
            } )
            .catch(error => alert(error.message))
       }

    return (
        <View style={styles.container}>

            <View style = {{backgroundColor: "#209209", height: "40%",}}>
            </View>

            <Text style = {styles.bigtitle}> GrünMeal </Text>

            <View style = {{ width: "100%", alignItems: 'center'}}>
                <View style = {styles.curvedLine}>
                </View>

                <View style = {styles.box}>
                    <Text style = {styles.title}> S'inscrire </Text>

                    <View style={styles.input}>
                        <AntDesign name="user" size={20} color="green" style={{marginRight: 10,}} />
                        <TextInput
                            onChangeText={(text) => setName(text)}
                            value={name}
                            placeholder="Nom et prénom"
                        />
                    </View>

                    <View style={styles.input}>
                        <MaterialCommunityIcons name={"phone-outline"} size={20} color="green" style={{marginRight: 10,}}/>
                        <TextInput
                            onChangeText={(text) => setTelephone(text)}
                            value={telephone}
                            placeholder="Téléphone"
                        />
                    </View>

                    <View style={styles.input}>
                        <MaterialCommunityIcons name={"email-outline"} size={20} color="green" style={{marginRight: 10,}}/>
                        <TextInput
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            placeholder="Adresse e-mail"
                        />
                    </View>

                    <View style={styles.input}>
                        <AntDesign name="lock1" size={18} color="green" style={{marginRight: 10,}}/>
                        <TextInput
                            onChangeText={(text) => setmotDePasse(text)}
                            value={motDePasse}
                            placeholder="Mot de passe"
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttontext }> Inscription </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

// onPress={() => navigation.replace('Regime')}

/*<View style={styles.input}>
                        <AntDesign name="lock1" size={18} color="green" style={{marginRight: 10,}}/>
                        <TextInput
                            onChangeText={(text) => handleChange('confMdp', text)}
                            value={values.confMdp}
                            placeholder="Confirmer le mot de passe"
                        />
                    </View>
*/

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    curvedLine: {
        marginTop : 80,
        height : "70%",
        width: "70%",
        borderRadius: 90,
        transform: [{scaleX: 2}, {scaleY: 2}]
    },
    bigtitle : {
        position: "absolute",
        textAlign: 'center',
        justifyContent: 'center',
        width: "100%",
        height: 48,
        marginTop: 30,
        fontFamily: 'serif',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 50,
        lineHeight: 48,
        color: "white",
    },
    box : {
        alignItems: 'center',
        position : "absolute",
        width: "80%",
        height: 500,
        marginTop: -150,
        borderStyle: 'solid',
        borderColor: 'rgb(190, 190, 190)',
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: "#FAFAFA",
    },
    title : {
        textAlign: 'center',
        justifyContent: 'center',
        width: 213,
        height: 45,
        top: 35,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 35,
        lineHeight: 48,
        color: "#868585",
    },

    input: {
        height: 40,
        margin: 12,
        top : 65,
        borderWidth: 1,
        borderColor: "rgb(190, 190, 190)",
        padding: 10,
        paddingEnd: 50,
        width: "90%",
        flexDirection: 'row',
        borderRadius: 10,
    },

    button : {
        backgroundColor: "#209209",
        padding: 10,
        top: 70,
        borderRadius: 100,
        width:"60%",
    },
    buttontext : {
        color:"white",
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: "center",
    },

});