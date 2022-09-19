import { useEffect, useState } from "react";
import {
    ScrollView,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    useWindowDimensions,
    FlatList,
} from "react-native";

import {
    Modal,
    ModalTitle,
    ModalContent,
    SlideAnimation,
} from "react-native-modals";
import { TouchableHighlight, TouchableOpacity } from "react-native-web";

const LOWER_BOUND = 0;
const UPPER_BOUND = 500;
const STEP = 5;

export default function ScrollingInput({ title, callback }) {
    const [modalVisible, setModalVisible] = useState(true);
    const [inputValue, setInputValue] = useState(0);
    const [numbers, setNumbers] = useState([]);

    useEffect(() => {
        setNumbers(range(LOWER_BOUND, UPPER_BOUND, STEP));
    }, []);

    /** Range code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from */
    const range = (start, stop, step = 1) => {
        return Array.from(
            { length: (stop - start) / step + 1 },
            (_, i) => start + i * step
        );
    };

    function toggleModal() {
        setModalVisible(!modalVisible);
    }

    return (
        <SafeAreaView style={styles.modalView}>
            <Modal
                visible={modalVisible}
                onTouchOutside={toggleModal}
                modalTitle={<ModalTitle title={title} />}
                modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
            >
                <ModalContent style={styles.modalContent}>
                    <FlatList
                        data={numbers}
                        renderItem={({ item }) => (
                            <TouchableHighlight
                                underlayColor={"#fff"}
                                onPress={() => console.log(item)}
                            >
                                <Text
                                    style={[
                                        styles.number,
                                        item === numbers[0] && styles.top,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableHighlight>
                        )}
                        keyExtractor={(item) => item.toString()}
                        initialNumberToRender={50}
                        initialScrollIndex={0}
                        snapToAlignment="center"
                        decelerationRate={"fast"}
                        showsVerticalScrollIndicator={false}
                    />
                </ModalContent>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    viewWrapper: {},
    modalView: {
        //height: "50%",
    },
    modalContent: {
        height: "25vh",
        aspectRatio: 1,
    },
    number: {
        marginTop: "10px",
        marginBottom: "10px",
        fontSize: "20px",
        textAlign: "center",
    },
    top: {
        marginTop: "50%",
    },
    bottom: {
        marginBottom: "50%",
    },
    inCenter: {
        fontStyle: "bold",
    },
});
