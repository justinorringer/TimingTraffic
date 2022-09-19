import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import moment from "moment";

import { SafeAreaView } from "react-native-safe-area-context";

import { Timer, ScrollingInput, RoundButton, TextButton } from "../components";
import Road from "../assets/Road";

const START = 5; // start time in seconds
const LAP = 10; // lap time in seconds

function Stopwatch() {
    const [start, setStart] = useState(moment(0)); // start time

    const [running, setRunning] = useState(false);

    const [now, setNow] = useState(moment(0)); // current time

    const [timer, setTimer] = useState(0); // timer object

    const [lap, setLap] = useState(moment(0));

    const [laps, setLaps] = useState([]); // dictionary of lap times; will have start and end fields

    let interval; // interval object
    let total = moment(0);

    // callback to set the start time (in seconds)
    function SetStart(start) {
        setStart(moment(start, "seconds"));
    }

    // callback to set the lap time (in seconds)
    function SetLap(lap) {
        setStart(moment(lap, "seconds"));
    }

    function StartTimer() {
        setStart(moment().subtract(start, "seconds"));
        setNow(moment());
        setLap(moment().add(lap - start, "seconds"));
        setLaps([0]);
        setRunning(true);
    }

    function LapTimer() {
        const now = moment();

        setStart(now);
        setNow(now);
        setLap(moment().add(lap, "seconds"));

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
        <SafeAreaView style={styles.stopwatchContainer}>
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
                    <RoundButton
                        style={styles.button}
                        title="Resume"
                        color="#fff"
                        background="#D2042D"
                        onPress={ResumeTimer}
                    />
                )}
            </View>
            {laps.length > 0 && (
                <View style={styles.resetContainer}>
                    <TextButton onPress={ResetTimer} title="Reset" />
                </View>
            )}
            <View style={styles.road}>
                <Road style={styles.road} />
            </View>
            <ScrollingInput title="Start Time" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    stopwatchContainer: {
        flex: 1,
        backgroundColor: "#323c39",
        alignItems: "center",
    },
    resetContainer: {
        // container for reset button; counteracts the button margins
        marginTop: "calc(-.18 * 100vh)",
        marginBottom: "calc(.18 * 100vh - 19px)", // -19px for the text size
    },
    container: {
        flex: 1,
        alignItems: "center",
        width: "60%",
        height: "60%",
        paddingTop: "calc(.15 * 100vh)",
    },
    timer: {
        color: "#fff",
        fontSize: 70,
        fontWeight: "200",
    },
    button: {
        marginTop: "auto",
        marginBottom: "calc(.20 * 100vh)",
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
        paddingTop: "calc(.05 * 100vh)",
        width: "90%",
        height: "95%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
    },
});

export default Stopwatch;
