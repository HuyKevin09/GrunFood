/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Pressable} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import RecettesScreen from '../screens/RecettesScreen';
import FavorisScreen from '../screens/FavorisScreen';
import SuiviScreen from "../screens/SuiviScreen";
import AjoutScreen from "../screens/AjoutScreen";
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ProfilScreen from "../screens/ProfilScreen";

export default function Navigation({colorScheme} : { colorScheme : ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{
                    headerShown: false,
                }}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <Stack.Group screenOptions={{presentation: "modal"}}>
                <Stack.Screen name="Profil" component={ProfilScreen}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Recettes"
            screenOptions={{
                // couleurs de la barre de navigation
                tabBarActiveTintColor: "#209209",
                tabBarInactiveTintColor: "white",
                tabBarInactiveBackgroundColor: "#434A40",
                tabBarActiveBackgroundColor: "#434A40",
                headerStyle: {
                    backgroundColor: "#209209"
                },
                headerTintColor: "#209209",
                headerTitleStyle: {
                    fontWeight: "bold"
                }
            }}>
            <BottomTab.Screen
                name="Recettes"
                component={RecettesScreen}
                options={({navigation} : RootTabScreenProps<'Recettes'>) => ({
                    title: 'GrünMeal',
                    headerTintColor: "black",
                    tabBarIcon: ({color}) => <TabBarIcon name="book-open-page-variant" color={color}/>,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Modal')}
                            style={({pressed}) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <MaterialCommunityIcons
                                name="information-outline"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{marginRight: 15}}
                            />
                        </Pressable>
                    ),
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Profil')}
                            style={({pressed}) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <MaterialCommunityIcons
                                name="account-circle"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{marginLeft: 15,}}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="Ajout"
                component={AjoutScreen}
                options={({navigation} : RootTabScreenProps<'Ajout'>) => ({
                    title: 'GrünMeal',
                    headerTintColor: "black",
                    tabBarIcon: ({color}) => <TabBarIcon name="plus-circle-outline" color={color}/>,
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Profil')}
                            style={({pressed}) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <MaterialCommunityIcons
                                name="account-circle"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{marginLeft: 15,}}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="Suivi"
                component={SuiviScreen}
                options={({navigation} : RootTabScreenProps<'Suivi'>) => ({
                    title: 'GrünMeal',
                    headerTintColor: "black",
                    tabBarIcon: ({color}) => <TabBarIcon name="chart-areaspline" color={color}/>,
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Profil')}
                            style={({pressed}) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <MaterialCommunityIcons
                                name="account-circle"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{marginLeft: 15}}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="Favoris"
                component={FavorisScreen}
                options={({navigation} : RootTabScreenProps<'Favoris'>) => ({
                    title: 'GrünMeal',
                    headerTintColor: "black",
                    tabBarIcon: ({color}) => <TabBarIcon name="heart" color={color}/>,
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Profil')}
                            style={({pressed}) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <MaterialCommunityIcons
                                name="account-circle"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{marginLeft: 15}}
                            />
                        </Pressable>
                    ),
                })}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props : {
    name : React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    color : string;
}) {
    return <MaterialCommunityIcons size={30} style={{marginBottom: -3}} {...props} />;
}
