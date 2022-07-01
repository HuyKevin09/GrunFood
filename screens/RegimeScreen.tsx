import { StyleSheet, Button, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';
import DropDownPicker from "react-native-dropdown-picker";
import {useState} from "react";

export default function RegimeScreen({navigation} : RootStackScreenProps<'Root'>) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vos préférences</Text>
            <Text style={styles.subtitle}> Quel est votre régime alimentaire? </Text>
            <DropDown></DropDown>

            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Allergenes')}> 
                <Text style={styles.suivant}> Suivant </Text>
            </TouchableOpacity>
        </View>
);
}

const DropDown = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    return (
        <View style={styles.dropdown}>
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