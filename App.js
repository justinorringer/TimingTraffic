import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import moment from "moment";

function Timer({ interval, style }) {
    const duration = Math.ceil(moment.duration(interval).asSeconds());

    return (
        <View style={styles.timerContainer}>
            <Text style={style}>{duration}</Text>
            <Text style={style}>seconds</Text>
        </View>
    );
}

function RoundButton({ title, color, background, onPress, disabled }) {
    return (
        <TouchableOpacity
            style={[styles.roundButton, { backgroundColor: background }]}
            onPress={() => !disabled && onPress()}
            activeOpacity={disabled ? 1.0 : 0.7}
        >
            <View style={styles.buttonBorder}>
                <Text style={[styles.roundButtonText, { color }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

function ButtonsRow({ children }) {
    return <View style={styles.buttonsRow}>{children}</View>;
}

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

export default function App() {
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

        let [firstLap, ...others] = laps;
        setLaps([0, firstLap + now - start, ...others]);
        setStart(now);
        setNow(now); // just to make sure its in sync
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
        backgroundColor: "#0D0D0D",
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 40,
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
    buttonsRow: {
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-between",
        marginTop: 80,
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
