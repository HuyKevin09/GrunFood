import { StyleSheet, ScrollView, StatusBar, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
/* npm install react-native-chart-kit*/
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons'

import feed from '../assets/data/feed'

import {db} from '../firebase';
import React,{useState,useEffect} from 'react';

export default function SuiviScreen() {
    const [recettes, setRecettes] = useState([])
    const fetchBlogs=async()=>{
        const response=db.collection('Recette');
        const data=await response.get();
        data.docs.forEach(item => {
            setRecettes([...recettes,item.data()])
        })
    }
    useEffect(() => {
        fetchBlogs();
    }, [])
    return (

        <ScrollView style={styles.scrollView}>

            <View style={styles.container}>
                <Text style={styles.title}> Mon Suivi</Text>

                <View style = {styles.rectangle}>

                    <View style= {styles.indices}>

                        <View style = {{alignItems: 'center', backgroundColor: "rgba(217, 242, 229, 0.27)", }}>
                            <Text style={{textAlign: 'left'}}> Indice de pollution   </Text>
                        </View>
                        <View style = {{alignItems: 'center',}}>
                            <Text> Indice de Consommation </Text>
                        </View>

                    </View>
                    <View style = {styles.lineChart}>
                        <LineChart
                            data={data}
                            width={screenWidth*0.7}
                            height={220}
                            chartConfig={chartConfig}
                        />
                    </View>
                </View>

                <Date></Date>
                <Text style={styles.conso}> Mes consommations </Text>

            </View>

            <View>
                {
                    recettes && recettes.map(recette=>{
                        return(
                            // <View>
                            //     <Text>{recette["Nom_recette"]}</Text>
                            //     <Text>{recette["ID"]}</Text>
                            //     <Text>{recette["culture"]}</Text>
                            //     <Text>{recette["indice_de_pollution"]}</Text>
                            //     <Text>{recette["ingredients"]}</Text>
                            //     <Image style={styles.image} source={{uri : recette["Image"]}}/>
                            // </View>
                            <View style={styles.item}>
                                <Image style={styles.image} source = {{uri : recette["Image"]}}/>
                                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection:'column', backgroundColor: "#f5f5f5"}}>
                                    <Text style={styles.flatListTitle}>{recette["Nom_recette"]}</Text>
                                    <Text style={styles.quantite}> IP : {recette["indice_de_pollution"]} </Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    );
}

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(181, 181, 181, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    useShadowColorFromDataset: false // optional
};

const data = {
    labels: ["S1", "S2", "S3", "S4"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(0, 115, 17, ${opacity})`,
            strokeWidth: 2
        }
    ],
    legend: ["Indice hebdomadaire"]
};

const Date = () => {
    return(
        <View style = {{flexDirection: 'row', justifyContent:'space-around', width: "60%", top: 450,}}>
            <TouchableOpacity>
                <AntDesign name="leftcircleo" size={24} color="green"/>
            </TouchableOpacity>
            <View style = {styles.date}>
                <Text> 20-07-22 to 27-07-22 </Text>
            </View>
            <TouchableOpacity>
                <AntDesign name="rightcircleo" size={24} color="green" />
            </TouchableOpacity>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        height:600,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        width: 213,
        height: 48,
        top: 100,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 40,
        lineHeight: 48,
        color: "#868585",
    },
    rectangle : {
        flexDirection: 'column',
        position: 'absolute',
        width: "80%",
        height: "60%",
        top: 170,
    },
    indices : {
        position: 'relative',
        flexDirection: 'row',
        justifyContent:'space-around',
        height: "10%",
        width:"100%",
    },
    date : {
        width: "70%",
        alignItems: 'center',
        backgroundColor: "rgba(217, 242, 229, 0.27)"
    },
    lineChart : {
        alignItems: 'center',
        backgroundColor: "rgba(217, 242, 229, 0.27)",
    },
    conso : {
        position: 'absolute',
        width: 176,
        height: 22,
        top: 550,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 21.78,

        color: "#868585",
    },
    scrollView: {
        //height:1000,
    },


    // FLATLIST
    flatlistcontainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: "#f5f5f5",
        padding: 20,
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    flatListTitle: {
        fontSize: 20,
        textAlign: "center",
    },
    image : {
        height: 100,
        width: 100,
    },
    quantite : {
        fontSize: 15,
        marginLeft: 60,
        marginTop:5,
    }
});