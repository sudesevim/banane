import React from "react";
import { TextInput } from "react-native";
import styles from "./Input.style";

const Input = ({ placeholder, value, onType, isSecure }) => {
  return (
    <TextInput
      autoCapitalize="none"
      style={styles.container}
      placeholder={placeholder}
      value={value}
      onChangeText={onType}
      secureTextEntry={isSecure}
    />
  );
};

export default Input;