import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const CodeGenScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('Python');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateCode = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    const fullPrompt = `Write the following code in ${language}: ${prompt}`;

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout',
          messages: [{ role: 'user', content: fullPrompt }],
        }),
      });

      const data = await res.json();
      setResponse(data.choices?.[0]?.message?.content || 'No response received.');
    } catch (err) {
      console.error(err);
      setResponse('Error generating code.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(response);
    Alert.alert('Copied', 'Code copied to clipboard');
  };

  const languageOptions = [
    {
      name: 'Python',
      icon: <FontAwesome5 name="python" size={20} />,
    },
    {
      name: 'JavaScript',
      icon: <FontAwesome5 name="js" size={20} />,
    },
    {
      name: 'C++',
      icon: <MaterialCommunityIcons name="language-cpp" size={20} />,
    },
    {
      name: 'Java',
      icon: <FontAwesome5 name="java" size={20} />,
    },
    {
      name: 'TypeScript',
      icon: <FontAwesome5 name="js" size={20} />,
    },
  ];

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#f4edfa', flexGrow: 1 }}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => router.push('/')} style={{ marginBottom: 15 }}>
        <Ionicons name="arrow-back" size={24} color="#6a0dad" />
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6a0dad', marginBottom: 10 }}>
        Code Generator
      </Text>

      {/* Language Icons */}
      <View style={{ flexDirection: 'row', marginBottom: 20, flexWrap: 'wrap' }}>
        {languageOptions.map((lang) => (
          <Pressable
            key={lang.name}
            onPress={() => setLanguage(lang.name)}
            style={{
              backgroundColor: language === lang.name ? '#6a0dad' : '#d8b8f8',
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 20,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            {React.cloneElement(lang.icon, {
              color: language === lang.name ? '#fff' : '#4b0082',
            })}
            <Text
              style={{
                color: language === lang.name ? '#fff' : '#4b0082',
                marginLeft: 6,
                fontWeight: '600',
              }}
            >
              {lang.name}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Prompt Input */}
      <TextInput
        placeholder="Describe what code you need..."
        value={prompt}
        onChangeText={setPrompt}
        multiline
        style={{
          borderWidth: 1,
          borderColor: '#b19cd9',
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 12,
          minHeight: 100,
          textAlignVertical: 'top',
          marginBottom: 15,
        }}
      />

      {/* Generate Button */}
      <Pressable
        onPress={generateCode}
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
          {loading ? 'Generating...' : 'Generate Code'}
        </Text>
      </Pressable>

      {/* Loading */}
      {loading && <ActivityIndicator size="large" color="#6a0dad" />}

      {/* Output Box */}
      {response ? (
        <View
          style={{
            backgroundColor: '#e6d6fa',
            padding: 15,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ color: '#4b0082', fontWeight: '600' }}>Generated Code:</Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Feather name="copy" size={20} color="#4b0082" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            style={{
              backgroundColor: '#f1e5ff',
              borderRadius: 8,
              padding: 10,
              maxHeight: 300,
            }}
          >
            <Text style={{ fontFamily: 'monospace', color: '#2e0854' }}>{response}</Text>
          </ScrollView>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default CodeGenScreen;
