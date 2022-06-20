import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import DropDownPicker from 'react-native-dropdown-picker'
import {useState} from "react";
import {SearchBar} from "@rneui/themed";

export default function AjoutScreen() {
    return (
        <View style={styles.container}>
            <Searchbar/>
            <Text style={styles.title}>Ajout</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </View>
);
}

const Searchbar = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    return (
        <View style={styles.container}>
            <SearchBar/>
        </View>
    )
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
});
