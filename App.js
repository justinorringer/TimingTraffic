import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Road from "./app/assets/Road";

import { NavigationContainer } from "@react-navigation/native";

import Stopwatch from "./app/pages/Stopwatch";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Stopwatch"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Stopwatch" component={Stopwatch} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
