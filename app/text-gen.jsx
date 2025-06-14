import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';

const TextGenScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const generateText = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/devstral-small',
          messages: [
            { role: 'user', content: prompt }
          ],
        }),
      });

      const data = await res.json();
      setResponse(data.choices?.[0]?.message?.content || 'No response received.');
    } catch (err) {
      setResponse('Error generating text.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#f7f3fc', flexGrow: 1 }}>
      <Link href="/" style={{ color: '#6a0dad', marginBottom: 20 }}>&larr; Back to Home</Link>

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6a0dad', marginBottom: 20 }}>
        Text Generator
      </Text>

      <TextInput
        placeholder="Type your prompt here..."
        value={prompt}
        onChangeText={setPrompt}
        multiline
        style={{
          borderWidth: 1,
          borderColor: '#d1b3ff',
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 12,
          minHeight: 100,
          textAlignVertical: 'top',
          marginBottom: 15,
        }}
      />

      <Pressable
        onPress={generateText}
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
          {loading ? 'Generating...' : 'Generate'}
        </Text>
      </Pressable>

      {loading && <ActivityIndicator size="large" color="#6a0dad" />}

      {response ? (
        <View style={{
          backgroundColor: '#e9d8fd',
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
        }}>
          <Text style={{ color: '#4b0082', fontWeight: '600', marginBottom: 5 }}>AI Response:</Text>
          <Text>{response}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default TextGenScreen;
