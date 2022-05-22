import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import Lap from "./Lap";

function LapsTable({ laps, timer, running }) {
    const finishedLaps = laps.slice(1);

    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;

    if (finishedLaps.length >= 2) {
        finishedLaps.forEach((lap) => {
            if (lap < min) {
                min = lap;
            }
            if (lap > max) {
                max = lap;
            }
        });
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.lapsTable}>
                {laps.map((lap, index) => (
                    <Lap
                        key={laps.length - index}
                        number={laps.length - index}
                        interval={index === 0 ? timer + lap : lap}
                        fastest={lap === min}
                        slowest={lap === max}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        alignSelf: "stretch",
    },
});

export default LapsTable;
