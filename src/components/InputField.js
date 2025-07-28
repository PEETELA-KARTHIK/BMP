// src/components/InputField.js
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { APP_COLORS } from '../config';

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  showTogglePassword = false,
  passwordVisible = false,
  onTogglePassword,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            showTogglePassword && styles.passwordInput,
            error && styles.inputError,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !passwordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          {...props}
        />

        {showTogglePassword && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={onTogglePassword}
          >
            <Ionicons
              name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color={APP_COLORS.gray}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: APP_COLORS.black,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: APP_COLORS.black,
  },
  passwordInput: {
    paddingRight: 44,
  },
  inputError: {
    borderColor: APP_COLORS.error,
  },
  passwordToggle: {
    position: 'absolute',
    right: 12,
    top: 12,
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: APP_COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default InputField;