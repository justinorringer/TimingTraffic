import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import moment from "moment";

import { Timer, LapsTable, RoundButton } from "../components";

function ButtonsRow({ children }) {
    return <View style={styles.buttonsRow}>{children}</View>;
}

function Stopwatch() {
    const [start, setStart] = useState(0); // start time

    const [running, setRunning] = useState(false);

    const [now, setNow] = useState(0); // current time

    const [laps, setLaps] = useState([]); // dictionary of lap times; will have start and end fields

    const [timer, setTimer] = useState(0); // timer object

    let interval; // interval object

    function StartTimer() {
        const now = new Date().getTime();
        setStart(now);
        setNow(now);
        setLaps([0]);
        setRunning(true);
    }

    function LapTimer() {
        const now = new Date().getTime();

        setStart(now);
        setNow(now);

        let [firstLap, ...others] = laps;
        setLaps([0, firstLap + now - start, ...others]);
        // just to make sure its in sync
    }

    function StopTimer() {
        clearInterval(interval);
        setRunning(false);

        let [firstLap, ...others] = laps;
        setLaps([firstLap + now - start, ...others]);

        setTimer(0);
        setStart(0);
        setNow(0);
    }

    function ResumeTimer() {
        const now = new Date().getTime();
        setStart(now);
        setNow(now);
        setRunning(true);
    }

    function ResetTimer() {
        setLaps([]);
        setStart(0);
        setNow(0);
        setTimer(0);
    }

    useEffect(() => {
        if (running) {
            interval = setInterval(() => {
                setNow(new Date().getTime());
            }, 100);
        }
    }, [start]);

    useEffect(() => {
        if (running) {
            let interval = now - start;

            setTimer(interval);
        }
    }, [now]);

    return (
        <View style={styles.container}>
            <Timer
                style={styles.timer}
                interval={laps.reduce((total, curr) => total + curr, 0) + timer}
                units
            />
            {laps.length === 0 && (
                <ButtonsRow>
                    <RoundButton
                        title="Lap"
                        color="#fff"
                        background="#151515"
                        disabled
                    />
                    <RoundButton
                        title="Start"
                        color="#fff"
                        background="#D2042D"
                        onPress={StartTimer}
                    />
                </ButtonsRow>
            )}
            {start > 0 && (
                <ButtonsRow>
                    <RoundButton
                        title="Lap"
                        color="#fff"
                        background="#3D3D3D"
                        onPress={LapTimer}
                    />
                    <RoundButton
                        title="Stop"
                        color="#fff"
                        background="#D2042D"
                        onPress={StopTimer}
                    />
                </ButtonsRow>
            )}
            {laps.length > 0 && start === 0 && (
                <ButtonsRow>
                    <RoundButton
                        title="Reset"
                        color="#fff"
                        background="#3D3D3D"
                        onPress={ResetTimer}
                    />
                    <RoundButton
                        title="Resume"
                        color="#fff"
                        background="#D2042D"
                        onPress={ResumeTimer}
                    />
                </ButtonsRow>
            )}
            <LapsTable laps={laps} timer={timer} running={running} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "60%",
        height: "60%",
        paddingTop: "30%",
    },
    timer: {
        color: "#fff",
        fontSize: 70,
        fontWeight: "200",
    },
    timerContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
    buttonsRow: {
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 20,
    },
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
    scrollView: {
        alignSelf: "stretch",
    },
    fastest: {
        color: "#00FF00",
    },
    slowest: {
        color: "#E83535",
    },
});

export default Stopwatch;
