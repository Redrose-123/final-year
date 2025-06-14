import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

const HumanizerScreen = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [humanizedText, setHumanizedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleHumanize = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setHumanizedText('');

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/devstral-small:free',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that rewrites AI-generated text to sound more natural, human-like, and fluent.',
            },
            {
              role: 'user',
              content: inputText,
            },
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) {
        setHumanizedText(reply.trim());
      } else {
        Alert.alert('Error', 'No response from model.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to process the text.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(humanizedText);
    Alert.alert('Copied', 'Humanized text copied to clipboard!');
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: '#f4edfa',
        flexGrow: 1,
      }}
    >
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push('/')} style={{ marginBottom: 15 }}>
        <Ionicons name="arrow-back" size={24} color="#6a0dad" />
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6a0dad', marginBottom: 10 }}>
        Humanizer Tool
      </Text>

      {/* Input Field */}
      <TextInput
        placeholder="Paste AI-generated text here..."
        value={inputText}
        onChangeText={setInputText}
        multiline
        style={{
          borderWidth: 1,
          borderColor: '#b19cd9',
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 12,
          minHeight: 120,
          textAlignVertical: 'top',
          marginBottom: 15,
        }}
      />

      {/* Button */}
      <Pressable
        onPress={handleHumanize}
        style={{
          backgroundColor: '#6a0dad',
          padding: 12,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 20,
        }}
        disabled={loading}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          {loading ? 'Humanizing...' : 'Humanize Text'}
        </Text>
      </Pressable>

      {/* Output Field */}
      {humanizedText ? (
        <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 10 }}>
          <Text style={{ fontSize: 16, color: '#333' }}>{humanizedText}</Text>

          <TouchableOpacity
            onPress={handleCopy}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
          >
            <Feather name="copy" size={18} color="#6a0dad" />
            <Text style={{ color: '#6a0dad', marginLeft: 6, fontWeight: '500' }}>Copy</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default HumanizerScreen;
