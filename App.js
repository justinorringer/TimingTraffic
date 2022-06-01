import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Road from "./app/assets/Road";

import { NavigationContainer } from "@react-navigation/native";

import Stopwatch from "./app/pages/Stopwatch";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function Notes() {
    return (
        <View>
            <Text>Notes</Text>
        </View>
    );
}
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Stopwatch"
                screenOptions={{
                    headerShown: false,
                }}
                tabBarPosition="bottom"
            >
                <Tab.Screen name="Stopwatch" component={Stopwatch} />
                <Tab.Screen name="Notes" component={Notes} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
