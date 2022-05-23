import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";

function Timer({ interval, style, units }) {
    const duration = Math.floor(moment.duration(interval).asSeconds());

    return (
        <View style={styles.timerContainer}>
            <Text style={style}>{duration}</Text>
            {units && <Text style={style}>sec</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    timer: {
        color: "#fff",
        fontSize: 70,
        fontWeight: "200",
    },
    timerContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
});

export default Timer;
