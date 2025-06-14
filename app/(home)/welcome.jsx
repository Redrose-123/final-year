import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
const { width, height } = Dimensions.get('window');

const phrases = [
  'Unleashing AI Power...',
  'Empowering Your Ideas...',
  'Building the Future...',
  'Welcome to AI Hub!',
];

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const logoScale = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslate = useRef(new Animated.Value(20)).current;
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [sound, setSound] = useState();

  const circles = useRef([...Array(15)].map(() => ({
    left: Math.random() * width,
    top: Math.random() * height,
    size: 10 + Math.random() * 30,
    animation: new Animated.Value(Math.random()),
  }))).current;

  const circuitLines = useRef([...Array(15)].map(() => ({
    left: Math.random() * width,
    top: Math.random() * height,
    width: 30 + Math.random() * 50,
    height: Math.random() > 0.5 ? 2 : 40,
    opacity: new Animated.Value(Math.random()),
  }))).current;

 

  useEffect(() => {
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();

    circles.forEach(({ animation }) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, { toValue: 1, duration: 4000 + Math.random() * 3000, useNativeDriver: false }),
          Animated.timing(animation, { toValue: 0, duration: 4000 + Math.random() * 3000, useNativeDriver: false }),
        ])
      ).start();
    });

    circuitLines.forEach(({ opacity }) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 1, duration: 2000 + Math.random() * 2000, useNativeDriver: false }),
          Animated.timing(opacity, { toValue: 0.2, duration: 2000 + Math.random() * 2000, useNativeDriver: false }),
        ])
      ).start();
    });

  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (charIndex < phrases[phraseIndex].length) {
        setDisplayText(prev => prev + phrases[phraseIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        if (phraseIndex === 0) {
          Animated.parallel([
            Animated.timing(buttonOpacity, {
              toValue: 1,
              duration: 1,
              useNativeDriver: true,
            }),
            Animated.timing(buttonTranslate, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
          setTimeout(() => {
            navigation.navigate('AIHubUI'); 
          }, 1000);
        }
        setTimeout(() => {
          setDisplayText('');
          setCharIndex(0);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 1500);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [charIndex, phraseIndex]);

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.container}
    >
      
      {circuitLines.map((line, index) => (
        <Animated.View
          key={`line-${index}`}
          style={[
            styles.circuitLine,
            {
              left: line.left,
              top: line.top,
              width: line.width,
              height: line.height,
              opacity: line.opacity,
            }
          ]}
        />
      ))}
      {circles.map((circle, index) => (
        <Animated.View
          key={`circle-${index}`}
          style={[
            styles.circle,
            {
              left: circle.left,
              top: circle.top,
              width: circle.size,
              height: circle.size,
              opacity: circle.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.6],
              }),
              transform: [{
                scale: circle.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.5],
                }),
              }],
            }
          ]}
        />
      ))}
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
        <Icon name="robot" size={100} color="#fff" />
      </Animated.View>
      <Text style={styles.title}>Welcome to AI Hub</Text>
      <Text style={styles.subtitle}>{displayText}</Text>
      <Animated.View style={{ opacity: buttonOpacity, transform: [{ translateY: buttonTranslate }] }}>
        <Link href='./dashboard'asChild>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('AIHubUI')}
        >
          <Text style={styles.startButtonText}>Get Started</Text>
        </TouchableOpacity>
        </Link>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoContainer: {
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 100,
    zIndex: 2,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    zIndex: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    minHeight: 24,
    zIndex: 2,
  },
  startButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    zIndex: 2,
  },
  startButtonText: {
    color: '#6a11cb',
    fontSize: 16,
    fontWeight: 'bold',
  },
  circle: {
    position: 'absolute',
    backgroundColor: '#ffffff20',
    borderRadius: 999,
  },
  circuitLine: {
    position: 'absolute',
    backgroundColor: '#ffffff20',
    borderRadius: 2,
  },
});
