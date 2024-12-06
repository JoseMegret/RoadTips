import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
    // TODO: Implement actual authentication
    navigation.replace('Main');
  };

  const handleForgotPassword = () => {
    // TODO: Implement actual password reset logic
    alert('Password reset link sent to your email.');
  };

  const handleCreateAccount = () => {
    if (isCreatingAccount) {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      // TODO: Implement actual account creation
      alert('Account created successfully');
      setIsCreatingAccount(false);
    } else {
      setIsCreatingAccount(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: '/placeholder.svg' }}
          style={styles.logo}
        />
        <Text style={styles.title}>RoadTips</Text>
        <Text style={styles.subtitle}>Your Travel Companion</Text>
        
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {isCreatingAccount && (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          )}
          {!isCreatingAccount && (
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          )}
          
          {!isCreatingAccount && (
            <TouchableOpacity style={styles.linkButton} onPress={handleForgotPassword}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.linkButton} onPress={handleCreateAccount}>
            <Text style={styles.linkText}>
              {isCreatingAccount ? 'Create Account' : 'Need an account? Sign up'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 40,
  },
  form: {
    width: '100%',
    maxWidth: 320,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
  linkText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});

