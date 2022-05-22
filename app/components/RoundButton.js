import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

function RoundButton({ title, color, background, onPress, disabled }) {
    return (
        <TouchableOpacity
            style={[styles.roundButton, { backgroundColor: background }]}
            onPress={() => !disabled && onPress?.()}
            activeOpacity={disabled ? 1.0 : 0.7}
        >
            <View style={styles.buttonBorder}>
                <Text style={[styles.roundButtonText, { color }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    roundButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    roundButtonText: {
        fontSize: 16,
    },
    buttonBorder: {
        width: 76,
        height: 76,
        borderRadius: 38,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default RoundButton;
