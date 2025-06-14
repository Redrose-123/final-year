import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
const tools = [
  { name: 'Text Generation', icon: 'file-document', color: '#9b59b6', route: '/text-gen' },
  { name: 'Image Generation', icon: 'image', color: '#8e44ad', route: '/image-gen' },
  { name: 'Code Generation', icon: 'code-tags', color: '#af7ac5', route: '/code-gen' },
  { name: 'Humanizer', icon: 'microphone', color: '#7d3c98', route: '/humanizer' },
  { name: 'Summerizer', icon: 'volume-high', color: '#6c3483', route: '/summerizer' },
  { name: 'Grammerly', icon: 'image-edit', color: '#a569bd', route: '/grammerly' },
  //{ name: 'Data Analysis', icon: 'chart-bar', color: '#884ea0', route: '/data-analysis' },
  { name: 'Chatbot', icon: 'robot', color: '#76448a', route: '/chatbot' },
];

const AnimatedToolRow = ({ tool }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }),
      Animated.sequence([
        Animated.timing(rotate, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.timing(rotate, { toValue: -1, duration: 100, useNativeDriver: true }),
        Animated.timing(rotate, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.timing(rotate, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const rotation = rotate.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg'],
  });

  return (
    <Link href={tool.route} asChild>
      <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          style={[
            styles.toolRow,
            { backgroundColor: tool.color, transform: [{ scale }] },
          ]}
        >
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Icon name={tool.icon} size={24} color="#fff" />
          </Animated.View>
          <Text style={styles.buttonText}>{tool.name}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default function AIHubUI() {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Link href="./welcome" asChild>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="home" size={24} color="#fff" />
            <Text style={styles.sidebarText}>AI Hub</Text>
          </TouchableOpacity>
        </Link>
        <Link href="./dasboard" asChild>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="view-list" size={24} color="#fff" />
            <Text style={styles.sidebarText}>Tools</Text>
          </TouchableOpacity>
        </Link>
        <Link href="./settings" asChild>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="cog" size={24} color="#fff" />
            <Text style={styles.sidebarText}>Settings</Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.sidebarBottom}>
          <Link href="./profile" asChild>
            <TouchableOpacity style={styles.sidebarItem}>
              <Icon name="account-circle" size={24} color="#fff" />
              <Text style={styles.sidebarText}>Profile</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.header}>AI Tools</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {tools.map((tool, index) => (
            <AnimatedToolRow key={index} tool={tool} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  sidebar: {
    width: 100,
    backgroundColor: '#5e3370',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sidebarItem: {
    alignItems: 'center',
    marginVertical: 10,
  },
  sidebarText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  sidebarBottom: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5e3370',
    marginBottom: 16,
  },
  toolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
});
