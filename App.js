import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Stopwatch from "./app/pages/Stopwatch";
import Notes from "./app/pages/Notes";

const Tab = createMaterialTopTabNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
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
            <StatusBar style="light" />
        </SafeAreaProvider>
    );
}
