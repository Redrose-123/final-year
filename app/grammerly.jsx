import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GrammarScreen = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert editor chatbot. Fix grammar, spelling, and sentence clarity in a friendly way. Always respond with only the corrected version.',
            },
            { role: 'user', content: input.trim() },
          ],
        }),
      });

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content?.trim();

      if (aiReply) {
        setMessages((prev) => [...prev, { from: 'ai', text: aiReply }]);
      }
    } catch (err) {
      console.error('Grammar fix error:', err);
      setMessages((prev) => [
        ...prev,
        { from: 'ai', text: 'Sorry, something went wrong while fixing the grammar.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f4edfa' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Ionicons name="arrow-back" size={24} color="#7b2cbf" />
        </TouchableOpacity>
        <Text style={styles.title}>Grammar Chat</Text>
      </View>

      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.from === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={{ color: msg.from === 'user' ? '#fff' : '#333' }}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a sentence to fix..."
          style={styles.input}
          multiline
        />
        <TouchableOpacity onPress={sendMessage} disabled={loading} style={styles.sendButton}>
          <Feather name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e6ccff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7b2cbf',
    marginLeft: 12,
  },
  chatContainer: {
    flex: 1,
    padding: 12,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
  },
  userBubble: {
    backgroundColor: '#9f3ed5',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#f5eaff',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f1e3ff',
    color: '#333',
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#7b2cbf',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GrammarScreen;
