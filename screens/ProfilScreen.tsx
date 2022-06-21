import {StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function ProfilScreen() {
    return (
        <View style={styles.container}>
            <Text>Prénom Nom</Text>
            <DropDown/>
        </View>
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
});
