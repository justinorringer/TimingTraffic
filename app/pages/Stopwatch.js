import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import moment from "moment";

import { Timer, RoundButton } from "../components";

import Road from "../assets/Road";

function ButtonsRow({ children }) {
    return <View style={styles.buttonsRow}>{children}</View>;
}

const START = 5; // start time in seconds
const LAP = 10; // lap time in seconds

function Stopwatch() {
    const [start, setStart] = useState(0); // start time

    const [running, setRunning] = useState(false);

    const [now, setNow] = useState(moment(0)); // current time

    const [timer, setTimer] = useState(0); // timer object

    const [lap, setLap] = useState(moment(0));

    const [laps, setLaps] = useState([]); // dictionary of lap times; will have start and end fields

    let interval; // interval object
    let total = moment(0);

    function StartTimer() {
        setStart(moment().subtract(START, "seconds"));
        setNow(moment());
        setLap(moment().add(LAP - START, "seconds"));
        setLaps([0]);
        setRunning(true);
    }

    function LapTimer() {
        const now = moment();

        setStart(now);
        setNow(now);
        setLap(moment().add(LAP, "seconds"));

        setTimer(0);

        setLaps([0]);

        // just to make sure its in sync
    }

    function StopTimer() {
        setRunning(false);
        clearInterval(interval);

        let [firstLap, ...others] = laps;
        setLaps([firstLap + now - start, ...others]);

        setTimer(moment(0));
        setStart(moment(0));
        setNow(moment(0));
    }

    function ResumeTimer() {
        setRunning(true);
        setStart(moment());
        setNow(moment());

        let temp = moment().add(LAP, "seconds").subtract(laps[0]);
        setLap(temp);
    }

    function ResetTimer() {
        setRunning(false);
        clearInterval(interval);

        setStart(0);
        setNow(moment(0));
        setTimer(0);

        setLaps([]);
    }

    useEffect(() => {
        if (running) {
            interval = setInterval(() => {
                setNow(moment());
            }, 100);
        }
    }, [start]);

    useEffect(() => {
        if (running) {
            let interval = now - start;

            setTimer(interval);

            if (now > lap) {
                LapTimer();
            }
        }
    }, [now]);

    return (
        <View style={styles.stopwatchContainer}>
            <View style={styles.container}>
                <Timer
                    style={styles.timer}
                    interval={
                        laps.reduce((total, curr) => total + curr, 0) + timer
                    }
                    units
                />
                <View style={styles.input}>
                    <Text style={styles.inputText}>Start: </Text>
                    <Text style={styles.inputText}>{START}</Text>
                </View>
                <View style={styles.input}>
                    <Text style={styles.inputText}> Lap: </Text>
                    <Text style={styles.inputText}>{LAP}</Text>
                </View>
                {start === 0 && (
                    <RoundButton
                        style={styles.button}
                        title="Start"
                        color="#fff"
                        background="#D2042D"
                        onPress={StartTimer}
                    />
                )}
                {start > moment(0) && (
                    <RoundButton
                        style={styles.button}
                        title="Stop"
                        color="#fff"
                        background="#D2042D"
                        onPress={StopTimer}
                    />
                )}
                {laps.length > 0 && !running && (
                    <View>
                        <RoundButton
                            style={styles.button}
                            title="Resume"
                            color="#fff"
                            background="#D2042D"
                            onPress={ResumeTimer}
                        />
                        <RoundButton
                            style={styles.button}
                            title="Reset"
                            color="#fff"
                            background="#3D3D3D"
                            onPress={ResetTimer}
                        />
                    </View>
                )}
            </View>
            <View style={styles.road}>
                <Road style={styles.road} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    stopwatchContainer: {
        flex: 1,
        backgroundColor: "#323c39",
        alignItems: "center",
        paddingHorizontal: 40,
    },
    container: {
        flex: 1,
        alignItems: "center",
        width: "60%",
        height: "60%",
        paddingTop: "40%",
    },
    timer: {
        color: "#fff",
        fontSize: 70,
        fontWeight: "200",
    },
    bottomButton: {
        justifyContent: "flex-end",
    },
    button: {
        marginTop: "20%",
        marginBottom: 20,
    },
    inputText: {
        color: "#fff",
        fontSize: 20,
    },
    input: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        color: "#fff",
    },
    scrollView: {
        alignSelf: "stretch",
    },
    road: {
        paddingTop: "5%",
        width: "90%",
        height: "90%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
    },
});

export default Stopwatch;
