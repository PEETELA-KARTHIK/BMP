// src/screens/priest/EarningsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import { APP_COLORS } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HEADER_TOP_PADDING = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

const EarningsScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState('current');
  const [withdrawalModalVisible, setWithdrawalModalVisible] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');

  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid amount');
      return;
    }

    if (amount > 12300) {
      Alert.alert('Validation Error', 'Withdrawal amount cannot exceed available balance');
      return;
    }

    // Process withdrawal
    Alert.alert('Success', 'Withdrawal request submitted successfully');
    setWithdrawalModalVisible(false);
    setWithdrawalAmount('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: APP_COLORS.background }}>
      <StatusBar backgroundColor={APP_COLORS.primary} barStyle="light-content" />
      <View style={[styles.header, { paddingTop: HEADER_TOP_PADDING, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 4, borderBottomWidth: 1, borderBottomColor: APP_COLORS.lightGray }]}>
        <Text style={styles.headerTitle}>Earnings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.earningsSummary}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Total Earnings</Text>
            <View style={styles.periodSelector}>
              <TouchableOpacity onPress={() => setSelectedMonth('previous')}>
                <Text
                  style={[
                    styles.periodText,
                    selectedMonth === 'previous' && styles.activePeriodText,
                  ]}
                >
                  Previous
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedMonth('current')}>
                <Text
                  style={[
                    styles.periodText,
                    selectedMonth === 'current' && styles.activePeriodText,
                  ]}
                >
                  Current
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.totalAmount}>₹45,000</Text>
          <View style={styles.growthIndicator}>
            <Ionicons
              name="arrow-up"
              size={16}
              color={APP_COLORS.success}
            />
            <Text style={styles.growthText}>12% vs last month</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.withdrawButton}
          onPress={() => setWithdrawalModalVisible(true)}
        >
          <Ionicons
            name="wallet-outline"
            size={20}
            color={APP_COLORS.white}
          />
          <Text style={styles.withdrawButtonText}>Withdraw Earnings</Text>
        </TouchableOpacity>

        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          <View style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <Text style={styles.transactionName}>Grih Pravesh</Text>
              <Text style={styles.transactionAmount}>₹15,000</Text>
            </View>
            <Text style={styles.transactionClient}>Sharma Family</Text>
            <View style={styles.transactionFooter}>
              <View style={styles.transactionDate}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={APP_COLORS.gray}
                />
                <Text style={styles.transactionDateText}>Nov 15, 2023</Text>
              </View>
              <View style={styles.transactionStatus}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={APP_COLORS.success}
                />
                <Text style={styles.transactionStatusText}>Completed</Text>
              </View>
            </View>
          </View>

          <View style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <Text style={styles.transactionName}>Satyanarayan Katha</Text>
              <Text style={styles.transactionAmount}>₹11,000</Text>
            </View>
            <Text style={styles.transactionClient}>Gupta Family</Text>
            <View style={styles.transactionFooter}>
              <View style={styles.transactionDate}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={APP_COLORS.gray}
                />
                <Text style={styles.transactionDateText}>Nov 12, 2023</Text>
              </View>
              <View style={styles.transactionStatus}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={APP_COLORS.success}
                />
                <Text style={styles.transactionStatusText}>Completed</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Withdrawal Modal */}
      <Modal
        visible={withdrawalModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setWithdrawalModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Withdraw Earnings</Text>
              <TouchableOpacity
                onPress={() => setWithdrawalModalVisible(false)}
              >
                <Ionicons name="close" size={24} color={APP_COLORS.gray} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.balanceText}>Available Balance: ₹12,300</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Amount (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={withdrawalAmount}
                  onChangeText={setWithdrawalAmount}
                  keyboardType="numeric"
                  placeholder="Enter amount to withdraw"
                />
              </View>

              <Text style={styles.paymentMethodLabel}>Payment Method</Text>
              <View style={styles.paymentMethods}>
                <TouchableOpacity
                  style={[
                    styles.paymentMethodOption,
                    selectedPaymentMethod === 'upi' &&
                      styles.selectedPaymentMethod,
                  ]}
                  onPress={() => setSelectedPaymentMethod('upi')}
                >
                  <View style={styles.radioButton}>
                    {selectedPaymentMethod === 'upi' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.paymentMethodText}>UPI</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.paymentMethodOption,
                    selectedPaymentMethod === 'card' &&
                      styles.selectedPaymentMethod,
                  ]}
                  onPress={() => setSelectedPaymentMethod('card')}
                >
                  <View style={styles.radioButton}>
                    {selectedPaymentMethod === 'card' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.paymentMethodText}>Credit/Debit Card</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.withdrawConfirmButton}
                onPress={handleWithdrawal}
              >
                <Text style={styles.withdrawConfirmButtonText}>
                  Withdraw Funds
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.background,
  },
  header: {
    backgroundColor: APP_COLORS.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
    // Top padding is now handled dynamically
  },
  headerTitle: {
    color: APP_COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
  },
  earningsSummary: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  periodSelector: {
    flexDirection: 'row',
  },
  periodText: {
    marginLeft: 12,
    color: APP_COLORS.gray,
  },
  activePeriodText: {
    color: APP_COLORS.primary,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  growthIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  growthText: {
    marginLeft: 4,
    color: APP_COLORS.success,
  },
  withdrawButton: {
    backgroundColor: APP_COLORS.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  withdrawButtonText: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  transactionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  transactionCard: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: APP_COLORS.primary,
  },
  transactionClient: {
    fontSize: 14,
    color: APP_COLORS.gray,
    marginBottom: 12,
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDateText: {
    marginLeft: 4,
    color: APP_COLORS.gray,
    fontSize: 14,
  },
  transactionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionStatusText: {
    marginLeft: 4,
    color: APP_COLORS.success,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: APP_COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    paddingBottom: 20,
  },
  balanceText: {
    fontSize: 16,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: APP_COLORS.gray,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  paymentMethodLabel: {
    fontSize: 14,
    color: APP_COLORS.gray,
    marginBottom: 8,
  },
  paymentMethods: {
    marginBottom: 20,
  },
  paymentMethodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
    borderRadius: 8,
    padding: 12,
  },
  selectedPaymentMethod: {
    borderColor: APP_COLORS.primary,
    backgroundColor: APP_COLORS.primary + '10',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: APP_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: APP_COLORS.primary,
  },
  paymentMethodText: {
    fontSize: 16,
  },
  withdrawConfirmButton: {
    backgroundColor: APP_COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  withdrawConfirmButtonText: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EarningsScreen;