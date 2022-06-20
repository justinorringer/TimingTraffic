import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import React from "react";

export default function TextButton({ onPress, title, disabled = false }) {
    return (
        <TouchableOpacity onPress={() => !disabled && onPress?.()}>
            <View style={styles.simpleButton}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    simpleButton: {
        alignItems: "center",
    },
    buttonText: {
        fontSize: 14,
        color: "#fff",
        textDecorationLine: "underline",
    },
});
