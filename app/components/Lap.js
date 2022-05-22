import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import Timer from "./Timer";

function Lap({ number, interval, fastest, slowest }) {
    const lapStyle = [
        styles.lapText,
        fastest && styles.fastest,
        slowest && styles.slowest,
    ];

    return (
        <View style={styles.lap}>
            <Text style={lapStyle}>Lap {number}</Text>
            <Timer
                style={[lapStyle, styles.lapTimer]}
                interval={interval}
            ></Timer>
        </View>
    );
}

const styles = StyleSheet.create({
    lapText: {
        color: "#fff",
        fontSize: 16,
    },
    lapTimer: {
        width: 25,
    },
    lap: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: "#151515",
        borderBottomWidth: 1,
        paddingVertical: 10,
        color: "#fff",
    },
});

export default Lap;
