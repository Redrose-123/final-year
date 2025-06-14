import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.tabContainer}>
          <Text style={styles.activeTab}>Sign Up</Text>
          <Text style={styles.inactiveTab}>Sign In</Text>
        </View>
        <Text style={styles.title}>Create An Account</Text>

        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#444" style={styles.icon} />
          <TextInput placeholder="Full Name" style={styles.input} />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#444" style={styles.icon} />
          <TextInput placeholder="Email" style={styles.input} />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#444" style={styles.icon} />
          <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} />
          <Icon name="visibility-off" size={20} color="#888" style={styles.eyeIcon} />
        </View>

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or sign up with</Text>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.googleBtn}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fbBtn}>
            <FontAwesome name="facebook" size={20} color="#fff" />
            <Text style={[styles.socialText, { color: '#fff', marginLeft: 5 }]}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d3d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    elevation: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#191654',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
  },
  activeTab: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveTab: {
    color: '#ccc',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '600',
    color: '#191654',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  eyeIcon: {
    marginLeft: 8,
  },
  signupButton: {
    backgroundColor: '#191654',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#555',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  fbBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  socialText: {
    fontWeight: 'bold',
  },
});