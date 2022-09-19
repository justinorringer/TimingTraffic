import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Stopwatch from "./app/pages/Stopwatch";
import Notes from "./app/pages/Notes";

import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";

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
            <ModalPortal />
        </SafeAreaProvider>
    );
}
