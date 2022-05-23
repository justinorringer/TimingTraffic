import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import moment from "moment";

import { Timer, RoundButton } from "../components";

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

        setStart(moment(0));
        setNow(moment(0));
        setTimer(0);

        setLaps([0]);
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
        <View style={styles.container}>
            <Timer
                style={styles.timer}
                interval={laps.reduce((total, curr) => total + curr, 0) + timer}
                units
            />
            {
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
            }
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
            {
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
            }
        </View>
    );
}

const styles = StyleSheet.create({
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
});

export default Stopwatch;
