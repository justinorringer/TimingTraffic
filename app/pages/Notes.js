import { View, TextInput, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";

export default function Notes() {
    const [note, setNote] = useState("");

    useEffect(() => {
        //  will make the key related to the timer instance

        try {
            AsyncStorage.getItem("NOTE").then((value) => {
                const n = value ? JSON.parse(value) : [];
                n.push(note);
                AsyncStorage.setItem("NOTE", JSON.stringify(n));
            });
        } catch (e) {
            // saving error
        }
    }, [note]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Notes</Text>
            <View style={styles.textContainer}>
                <TextInput
                    value={note}
                    onChangeText={setNote}
                    style={[styles.textInput]}
                    multiline
                    selectionColor="#00f"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#323c39",
        padding: 30,
        paddingTop: "calc(.1 * 100vh)",
        width: "100%",
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
    },
    textContainer: {
        flex: 1,
        backgroundColor: "#fff",
        color: "#000000",
        outlineColor: "#523009",
        outlineStyle: "solid",
        outlineWidth: 4,
        height: "100%",
    },
    textInput: {
        color: "#000",
        fontSize: 22,
        fontWeight: "200",
        zIndex: 1,
        lineHeight: 26,
        width: "100%",
        position: "absolute",
        height: "100%",
        padding: "20px",
    },
});
