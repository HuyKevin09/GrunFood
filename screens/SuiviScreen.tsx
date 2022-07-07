import { StyleSheet, ScrollView, StatusBar, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
/* npm install react-native-chart-kit*/
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons'

import feed from '../assets/data/feed'

import {db} from '../firebase';
import firebase from '../firebase';
import React,{useState,useEffect} from 'react';

import { format } from 'date-fns'

export default function SuiviScreen() {


    const [recettes, setRecettes] = useState([])
    const [indices, setIndices] = useState([0])
    const [dates, setDates] = useState([0])


    const fetchBlogs=async()=>{
        const user = firebase.default.auth().currentUser;
        const response=db.collection('HistoriqueHebd').doc(user?.uid).collection('Recette');
        const data=await response.get();
        data.docs.forEach(recette => {
            setIndices(indices => [...indices,recette.data().indice_de_pollution])
            setRecettes(recettes => [...recettes,recette.data()])
            setDates(dates => [...dates, format(recette.data().date.toDate(), 'dd-MM')] )
        }
        );
       
    }

    {     
    useEffect(() => {
        fetchBlogs()
        indices.shift()
        setIndices(indices) 
        dates.shift()
        setDates(dates)
        console.log(indices.length)
        while(indices.length > 7){
            indices.shift()
            setIndices(indices) 
            dates.shift()
            setDates(dates)
        }
    }, [])
    }

    //  [5,15,27,10]
    const data = {
        labels: ["7 derniers repas"],
        datasets: [
            {
                data: indices,
                color: (opacity = 1) => `rgba(0, 115, 17, ${opacity})`,
                strokeWidth: 2
            }
        ],
        legend: ["Indice journalier"]
    };

    const Date = () => {
        return(
            <View style = {{flexDirection: 'row', justifyContent:'space-around', width: "60%", top: 420,}}>
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
                        // console.log("RECETTES", recettes)
                        // console.log("INDICES", indices)
                        // console.log("DATES", dates)
        
                        return(
                            <View style={styles.item}>
                                <Image style={styles.image} source = {{uri : recette["image_recette"]}}/>
                                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection:'column', backgroundColor: "#f5f5f5"}}>
                                    <Text style={styles.flatListTitle}>{recette["nom_recette"]}</Text>
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
    strokeWidth: 2, 
    useShadowColorFromDataset: false 
};







const styles = StyleSheet.create({
    container: {
        height:600,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        width: 213,
        height: 48,
        top: 50,
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
        top: 130,
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
        top: 540,
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
        fontSize: 15,
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