import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";

function Timer({ interval, style, units }) {
    const duration = Math.floor(moment.duration(interval).asSeconds());

    return (
        <View style={styles.timerContainer}>
            <Text style={style}>{duration}</Text>
            {units && <Text style={[style, styles.units]}>sec</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    timerContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
    },
    units: {
        fontSize: 50,
        marginTop: "-10px",
    },
});

export default Timer;
