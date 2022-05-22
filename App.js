import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Road from "./app/assets/Road";

import Stopwatch from "./app/pages/Stopwatch";

export default function App() {
    return (
        <View style={styles.container}>
            <Stopwatch />
            <View style={styles.road}>
                <Road style={styles.road} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#323c39",
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 40,
    },
    road: {
        width: "90%",
        height: "90%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
    },
});
