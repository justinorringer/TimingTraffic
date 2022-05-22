import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { RoundButton } from "./app/components";

function ButtonsRow({ children }) {
    return <View style={styles.buttonsRow}>{children}</View>;
}

const styles = StyleSheet.create({
    buttonsRow: {
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-between",
        marginTop: 80,
        marginBottom: 20,
    },
});

export default ButtonsRow;
