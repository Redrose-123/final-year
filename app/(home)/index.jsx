
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import WelcomeScreen from './welcome'; 
 
import { Link } from 'expo-router';


export default function App() {
  return (
    
      <SafeAreaView style={{ flex: 1 }}>
          <WelcomeScreen />   
      </SafeAreaView>

  );
}