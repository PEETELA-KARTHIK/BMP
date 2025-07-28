// src/components/ApiConnectionTest.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { testApiConnection } from '../redux/slices/authSlice';
import { API_URL } from '../config';
import axios from 'axios';

/**
 * A debug component to test API connection from a mobile device
 * Add this to your login screen temporarily to diagnose connection issues
 */
const ApiConnectionTest = () => {
  const dispatch = useDispatch();
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const networkStatus = useSelector((state) => state.auth.networkStatus);

  const addResult = (label, result) => {
    setTestResults(prev => [
      { id: Date.now(), label, result, timestamp: new Date().toLocaleTimeString() },
      ...prev
    ]);
  };

  const runConfigTest = () => {
    addResult('API URL', `Current URL: ${API_URL}`);
  };

  const runApiTest = async () => {
    setIsLoading(true);
    try {
      const result = await dispatch(testApiConnection()).unwrap();
      addResult('API Test', `Success: ${JSON.stringify(result)}`);
    } catch (error) {
      addResult('API Test', `Failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const runDirectTest = async () => {
    setIsLoading(true);
    try {
      addResult('Direct Test', `Attempting to reach ${API_URL}/api/test...`);
      const response = await axios.get(`${API_URL}/api/test`, { timeout: 5000 });
      addResult('Direct Test', `Success: ${JSON.stringify(response.data)}`);
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error.response) {
        errorMessage = `Server responded with status ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'No response received - network error';
      } else {
        errorMessage = error.message;
      }
      addResult('Direct Test', `Failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Connection Tester</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={runConfigTest}>
          <Text style={styles.buttonText}>Check Config</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={runApiTest}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Testing...' : 'Test API'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={runDirectTest}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Testing...' : 'Direct Test'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearResults}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Network Status:</Text>
        <Text style={[
          styles.statusValue,
          networkStatus?.isConnected ? styles.statusConnected : styles.statusDisconnected
        ]}>
          {networkStatus?.isConnected ? 'Connected' : 'Disconnected'}
        </Text>
        {networkStatus?.lastChecked && (
          <Text style={styles.statusTimestamp}>
            Last checked: {new Date(networkStatus.lastChecked).toLocaleTimeString()}
          </Text>
        )}
      </View>

      <ScrollView style={styles.resultsContainer}>
        {testResults.length === 0 ? (
          <Text style={styles.noResults}>No test results yet</Text>
        ) : (
          testResults.map(item => (
            <View key={item.id} style={styles.resultItem}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultLabel}>{item.label}</Text>
                <Text style={styles.resultTimestamp}>{item.timestamp}</Text>
              </View>
              <Text style={styles.resultValue}>{item.result}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#495057',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#FF6B00',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.6,
  },
  clearButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6c757d',
  },
  clearButtonText: {
    color: '#6c757d',
  },
  statusContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  statusLabel: {
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 14,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusConnected: {
    color: '#28a745',
  },
  statusDisconnected: {
    color: '#dc3545',
  },
  statusTimestamp: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
  resultsContainer: {
    maxHeight: 300,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  noResults: {
    textAlign: 'center',
    color: '#6c757d',
    fontStyle: 'italic',
    padding: 16,
  },
  resultItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    paddingVertical: 8,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  resultLabel: {
    fontWeight: 'bold',
    color: '#495057',
  },
  resultTimestamp: {
    fontSize: 12,
    color: '#6c757d',
  },
  resultValue: {
    color: '#212529',
    fontSize: 14,
  },
});

export default ApiConnectionTest;