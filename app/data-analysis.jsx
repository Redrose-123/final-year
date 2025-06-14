import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const DataAnalysisScreen = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzeData = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/google/gemma-4b',
        { inputs: inputText },
        {
          headers: {
            Authorization: 'Bearer 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',
          },
        }
      );
      setResult(response.data?.[0]?.generated_text || JSON.stringify(response.data));
    } catch (error) {
      setResult('Error analyzing data: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}> AI Data Analysis</Text>

      <TextInput
        style={styles.input}
        placeholder="Paste your data or description here..."
        placeholderTextColor="#ccc"
        multiline
        value={inputText}
        onChangeText={setInputText}
      />

      <TouchableOpacity style={styles.button} onPress={analyzeData} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Analyzing...' : 'Analyze Data'}</Text>
      </TouchableOpacity>

      <ScrollView style={styles.resultBox}>
        <Text style={styles.resultText}>{result}</Text>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082', // Purple theme
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#6A0DAD',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#9400D3',
    borderRadius: 8,
    marginVertical: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultBox: {
    backgroundColor: '#3b006b',
    borderRadius: 10,
    padding: 12,
    maxHeight: 250,
  },
  resultText: {
    color: '#eee',
    fontSize: 15,
  },
});

export default DataAnalysisScreen;