import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Text, View, } from '../components/Themed';
import DropDownPicker from "react-native-dropdown-picker";
import {useState} from "react";

import firebase from '../firebase';
import {auth, db} from '../firebase';

export default function RegimeScreen({navigation} : RootStackScreenProps<'Root'>) {

    const chooseRegime = () => {
            console.log('Choix de régime fait');
            const user = firebase.default.auth().currentUser;
            const userDocument = db.collection("Preference").doc(user?.uid).set({
                    ID_utilisateur : user?.email,
                    regime_alimentaire: regime,
                });
            navigation.replace("Allergenes");
       }

    const [open, setOpen] = useState(false);
    let [regime, setRegime]= useState('')
    const handleSelect = (e) => {
        console.log(e.value)
        setRegime(e.value)
       }
    
       const DropDown = () => {   
        return (
            <View style={styles.dropdown}>
                <DropDownPicker
                    setValue={setRegime}
                    value={regime}
                    items={[
                        {label: "Végétarien", value: "vegetarien"},
                        {label: "Végan", value: "vegan"},
                        {label: "Aucun", value: "aucun"},
                    ]}
                    placeholder={"Sélectionnez votre type d'alimentation"}
                    open={open}
                    setOpen={setOpen}
                    onSelectItem = {handleSelect}
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vos préférences</Text>
            <Text style={styles.subtitle}> Quel est votre régime alimentaire? </Text>
            <DropDown></DropDown>

            <TouchableOpacity style={styles.button} onPress={chooseRegime}> 
                <Text style={styles.suivant}> Suivant </Text>
            </TouchableOpacity>
        </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 25,
        lineHeight: 48,
        top: 50,
        color: "#868585",
    },
    subtitle : {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 30,
        top: 75,
        color: "#868585",
    },
    dropdown : {
        alignItems: 'center',
        top : 100, 
    }, 
    button : {
        backgroundColor: '#209209',
        padding: 10,
        top: 300,
        borderRadius: 100,
        width:"40%",
    },
    suivant : {
        color:"white",
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: "center",
    },
});