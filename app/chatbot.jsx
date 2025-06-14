import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

const ChatWithDeepSeek = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: newMessages,
        }),
      });

      const data = await res.json();
      console.log('API Response:', JSON.stringify(data, null, 2));

      if (data.error) {
        const errorMessage = data.error.message || 'Unknown error from API';
        setMessages([...newMessages, { role: 'assistant', content: `API Error: ${errorMessage}` }]);
        return;
      }

      if (!data.choices || !data.choices[0]?.message) {
        setMessages([...newMessages, { role: 'assistant', content: 'Error: No valid reply from model.' }]);
        return;
      }

      const reply = data.choices[0].message;
      setMessages([...newMessages, reply]);
    } catch (error) {
      console.error('Fetch error:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Error: Network or fetch issue.' }]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: '#ede7f6' }}>
      <ScrollView style={{ flex: 1, marginBottom: 10 }} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={{
              backgroundColor: msg.role === 'user' ? '#d1c4e9' : '#e1bee7',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              borderRadius: 16,
              padding: 12,
              marginVertical: 6,
              maxWidth: '80%',
              position: 'relative',
            }}
          >
            <Text style={{ fontWeight: 'bold', marginBottom: 4, color: '#4a148c' }}>{msg.role}:</Text>
            <Text style={{ color: '#4a148c' }}>{msg.content}</Text>
            {msg.role === 'assistant' && (
              <TouchableOpacity
                onPress={() => copyToClipboard(msg.content)}
                style={{ position: 'absolute', top: 10, right: 10 }}
              >
                <Ionicons name="copy" size={18} color="#6a1b9a" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Ask something..."
        placeholderTextColor="#9c27b0"
        style={{
          borderWidth: 1,
          borderColor: '#ce93d8',
          padding: 12,
          borderRadius: 10,
          backgroundColor: '#ffffff',
          color: '#4a148c',
        }}
      />
      <View style={{ marginTop: 10, alignItems: 'flex-end' }}>
        <Pressable
          onPress={sendMessage}
          disabled={loading}
          style={{
            backgroundColor: '#7b1fa2',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            opacity: loading ? 0.6 : 1,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{loading ? 'Sending...' : 'Send'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChatWithDeepSeek;
