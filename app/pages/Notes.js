import { View, TextInput, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

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
                    style={[
                        styles.textInput,
                        { height: Platform.OS == "android" ? 40 : 20 },
                    ]}
                    multiline={true}
                    autoFocus
                    selectionColor="#000"
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
        paddingTop: "10%",
        width: "100%",
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
    },
    textContainer: {
        flex: 1,
        backgroundColor: "#fff",
        color: "#000000",
        marginTop: "5%",
        outlineColor: "#523009",
        outlineStyle: "solid",
        outlineWidth: 4,
    },
    textInput: {
        color: "#0000",
        fontSize: 22,
        fontWeight: "200",
        zIndex: 1,
        lineHeight: 22,
        width: "100%",
        position: "absolute",
        paddingVertical: 0,
    },
});
