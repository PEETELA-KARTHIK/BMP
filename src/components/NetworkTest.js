// src/components/NetworkTest.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { API_URL } from '../config';
import axios from 'axios';

const NetworkTest = () => {
  const [testResult, setTestResult] = useState('Not tested');
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult('Testing...');

    try {
      const response = await axios.get(`${API_URL}/api/test`, {
        timeout: 5000,
      });
      setTestResult(`Success! Server responded with: ${JSON.stringify(response.data)}`);
    } catch (error) {
      if (error.response) {
        // Server responded with an error code
        setTestResult(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // Network error
        setTestResult(`Network error: Could not reach ${API_URL}. Make sure server is running and on same network.`);
      } else {
        setTestResult(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Network Test</Text>
      <Text>API URL: {API_URL}</Text>
      <Button
        title={isLoading ? "Testing..." : "Test Connection"}
        onPress={testConnection}
        disabled={isLoading}
      />
      <Text style={styles.result}>{testResult}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  result: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
  }
});

export default NetworkTest;