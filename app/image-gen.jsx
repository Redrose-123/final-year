import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons, Feather } from '@expo/vector-icons';

const ImageGenScreen = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImageUrl('');

    try {
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'generated-image.jpg';
      const downloaded = await FileSystem.downloadAsync(imageUrl, fileUri);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow storage access to save images.');
        return;
      }

      await MediaLibrary.saveToLibraryAsync(downloaded.uri);
      Alert.alert('Success', 'Image saved to gallery!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to download image.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: '#f4edfa',
        flexGrow: 1,
      }}
    >
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => router.push('/')} style={{ marginBottom: 15 }}>
        <Ionicons name="arrow-back" size={24} color="#6a0dad" />
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6a0dad', marginBottom: 10 }}>
        Image Generator
      </Text>

      {/* Prompt Input */}
      <TextInput
        placeholder="Describe the image you want..."
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
        onPress={generateImage}
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
          {loading ? 'Generating...' : 'Generate Image'}
        </Text>
      </Pressable>

      {/* Loader */}
      {loading && <ActivityIndicator size="large" color="#6a0dad" />}

      {/* Image Display & Download */}
      {imageUrl ? (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: '100%',
              height: 300,
              borderRadius: 10,
              resizeMode: 'cover',
              marginBottom: 10,
            }}
          />

          <TouchableOpacity
            onPress={downloadImage}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#9e68c1',
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Feather name="download" size={20} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: '600', marginLeft: 6 }}>Download</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default ImageGenScreen;
