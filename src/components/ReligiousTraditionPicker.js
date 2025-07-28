// src/components/ReligiousTraditionPicker.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { APP_COLORS } from '../config';

const ReligiousTraditionPicker = ({
  value,
  onChange,
  isVisible,
  onClose,
  label = 'Religious Tradition',
  placeholder = 'Select Religious Tradition',
}) => {
  const religiousOptions = [
    'Hinduism',
    'Buddhism',
    'Jainism',
    'Sikhism',
    'Zoroastrianism',
    'Other'
  ];

  const selectOption = (option) => {
    onChange(option);
    onClose();
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TouchableOpacity
          style={styles.selectInput}
          onPress={() => onClose(true)}
        >
          <Text
            style={[
              styles.selectText,
              !value && styles.placeholderText,
            ]}
          >
            {value || placeholder}
          </Text>
          <Ionicons name="chevron-down" size={24} color={APP_COLORS.gray} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Religious Tradition</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color={APP_COLORS.gray} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.optionsList}>
              {religiousOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => selectOption(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                  {option === value && (
                    <Ionicons name="checkmark" size={24} color={APP_COLORS.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
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
  selectInput: {
    height: 48,
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
  },
  placeholderText: {
    color: APP_COLORS.gray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  modalContent: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.lightGray,
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsList: {
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.lightGray,
  },
  optionText: {
    fontSize: 16,
  },
});

export default ReligiousTraditionPicker;