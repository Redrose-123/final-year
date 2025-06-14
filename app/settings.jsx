import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Image,
  Alert,
  Pressable,
} from 'react-native';
//import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [isDark, setIsDark] = useState(false);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/80');
  const [privacyToggle, setPrivacyToggle] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);
  const togglePrivacy = () => setPrivacyToggle(prev => !prev);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('User logged out') },
    ]);
  };

  const handleProfileImageChange = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission denied', 'Allow access to change profile photo.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setProfileImage(pickerResult.assets[0].uri);
    }
  };

  const handleLinkPress = (title) => {
    Alert.alert(title, `${title} screen would appear here.`);
  };

  const themeStyles = isDark ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>      
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleProfileImageChange}>
          <Image source={{ uri: profileImage }} style={styles.avatar} />
          <View style={styles.editIcon}>
            <MaterialIcons name="edit" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
        <View style={styles.profileText}>
          <Text style={[styles.name, themeStyles.text]}>Jane Doe</Text>
          <Text style={[styles.email, themeStyles.text]}>jane.doe@example.com</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={[styles.label, themeStyles.text]}>Dark Theme</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#9b59b6' }}
          thumbColor={isDark ? '#fff' : '#fff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDark}
        />
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, themeStyles.text]}>Privacy</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#9b59b6' }}
          thumbColor={privacyToggle ? '#fff' : '#fff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={togglePrivacy}
          value={privacyToggle}
        />
      </View>

      <TouchableOpacity style={styles.linkRow} onPress={() => handleLinkPress('Terms of Service')}>
        <View style={styles.linkRowContent}>
          <Text style={[styles.linkText, themeStyles.text]}>Terms of Service</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={themeStyles.text.color} />
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />

      <Pressable
        style={({ pressed }) => [
          styles.logoutButton,
          { backgroundColor: pressed ? '#7d3c98' : '#9b59b6' },
        ]}
        onPress={handleLogout}
      >
        <Ionicons name="exit-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    left: 55,
    backgroundColor: '#9b59b6',
    borderRadius: 10,
    padding: 4,
  },
  profileText: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  label: {
    fontSize: 16,
  },
  linkRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  linkRowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 'auto',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f3e6ff',
  },
  text: {
    color: '#1a1a1a',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1126',
  },
  text: {
    color: '#ffffff',
  },
});

export default SettingsScreen;
