import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, CheckBox, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; // Expo icons for Google & Facebook

const SignInScreen = () => {
  const [rememberMe, setRememberMe] = useState(false); // <- added state

  return (
    <View style={styles.container}>
      {/* Header Curve with Tabs */}
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backArrow}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.tabContainer}>
          <Text style={styles.inactiveTab}>Sign Up</Text>
          <Text style={styles.activeTab}>Sign In</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Welcome Back !</Text>

        {/* Email Field */}
        <View style={styles.inputWrapper}>
          <Icon name="email-outline" size={20} color="gray" />
          <TextInput placeholder="Email" style={styles.textInput} />
        </View>

        {/* Password Field */}
        <View style={styles.inputWrapper}>
          <Icon name="lock-outline" size={20} color="gray" />
          <TextInput placeholder="Password" style={styles.textInput} secureTextEntry />
        </View>

        {/* Checkbox + Forgot Password */}
        <View style={styles.row}>
          <CheckBox
            value={rememberMe}
            onValueChange={() => setRememberMe(!rememberMe)}
          />
          <Text style={styles.remember}>Remember Password</Text>
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        {/* Divider */}
        <Text style={styles.orText}>Or sign in with</Text>

        {/* Social Buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.googleBtn}>
            <AntDesign name="google" size={20} color="black" />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.facebookBtn}>
            <FontAwesome name="facebook" size={20} color="#fff" />
            <Text style={[styles.socialText, { color: "#fff" }]}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Curve */}
      <View style={styles.bottomCurve} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    backgroundColor: '#2f2c66',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 40,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backArrow: {
    position: 'absolute',
    left: 20,
    top: 50,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  activeTab: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 20,
  },
  inactiveTab: {
    color: '#bbb',
    fontSize: 16,
    marginHorizontal: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  remember: {
    marginLeft: 5,
    flex: 1,
  
  },
  forgotBtn: {
    marginLeft: 'auto',
  },
  forgotText: {
    color: 'red',
    fontSize: 12,
  },
  signInButton: {
    backgroundColor: '#2f2c66',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: 'gray',
    marginVertical: 10,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  googleBtn: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    width: '48%',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookBtn: {
    backgroundColor: '#3b5998',
    padding: 10,
    width: '48%',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    marginLeft: 10,
    fontWeight: '500',
  },
  bottomCurve: {
    backgroundColor: '#2f2c66',
    height: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 30,
  },
});

export default SignInScreen;
