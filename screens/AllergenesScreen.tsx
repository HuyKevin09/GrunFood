import { StyleSheet,StatusBar, Button, TouchableOpacity, FlatList,ScrollView,} from 'react-native';

import { Ionicons } from '@expo/vector-icons'; 
import { Text, View, } from '../components/Themed';


export default function AjoutScreen() {
    return (
        <ScrollView style={styles.scrollview}>
            <View style = {{alignItems: 'flex-end', position: 'absolute', width: "100%", marginTop: 45, paddingRight: 15,}}>
                <Ionicons name="md-checkmark-circle-outline" size={40} color="green"/>
            </View>
            <View style = {styles.text}>
                <Text style={styles.title}>Vos préférences</Text>
                <Text style={styles.subtitle}> Quels sont vos allergènes? </Text>
            </View>

            <View style={styles.flatlist}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </ScrollView>
);
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
        title :'Arachide',
    },
    {
        id: '1',
        title:'Céleri',
    },
    {
        id: '2',
        title : 'Céréales',
    },
    {
        id: '3',
        title : 'Céréales',
    },{
        id: '4',
        title : 'Céréales',
    },{
        id: '5',
        title : 'Céréales',
    },{
        id: '6',
        title : 'Céréales',
    },{
        id: '7',
        title : 'Céréales',
    },{
        id: '8',
        title : 'Céréales',
    },{
        id: '9',
        title : 'Céréales',
    },
  ];


  const Item = ({ item}) => (
    <TouchableOpacity>
    <View style={styles.item}>
        <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: "#f5f5f5"}}>
            <Text>{item.title}</Text>
        </View>
    </View>
    </TouchableOpacity>
  );


const styles = StyleSheet.create({
    scrollview : {
        backgroundColor: "white", 
        height: "100%"
    },
    text : {
        alignItems: 'center',
        position: 'relative',
    },
    // temporaire
    /*
    prefAndCheck : {
        flexDirection: 'row',
        width: "100%",
        marginTop: 30, 
    },*/
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