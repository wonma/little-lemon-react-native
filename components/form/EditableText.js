import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const EditableText = ({edit, value, onChangeText, lable, keyboardType, error, errorComponent }) => {
  return (
    <>
      <Text style={styles.lable}>{lable}</Text>
      {edit ? <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      /> : <Text style={styles.text}> {value ? value : "-"} </Text>}
      {error && errorComponent}
    </>
  );
};

export default EditableText;

const styles = StyleSheet.create({
  lable: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#495E57",
  },
  input: {
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 5,
    fontFamily: "karla-regular",
    fontSize: 16,
  },
  text : {
    padding: 5,
    fontFamily: "karla-regular",
    fontSize: 16,
  }
});
