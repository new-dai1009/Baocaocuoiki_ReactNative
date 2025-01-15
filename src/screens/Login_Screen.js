import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { signInUser } from '../constant/auth/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/userActions';

const { width, height } = Dimensions.get('window');

const Login_Screen = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('SIGN IN');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigation = useNavigation();
  const [userNameValid, setUserNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === 'REGISTER') {
      navigation.navigate('Register');
    }
  };

  const handleSignIn = async () => {
    let valid = true;

    if (!username) {
      setUserNameValid(false);
      valid = false;
    } else {
      setUserNameValid(true);
    }

    if (!password) {
      setPasswordValid(false);
      valid = false;
    } else {
      setPasswordValid(true);
    }

    if (!valid) {
      setLoginError('Please fill in all required fields.');
      return;
    }

    try {
      const credentials = { username, password };
      const data = await signInUser(credentials);
      console.log('Login successful:', data);
      if (data) {
        dispatch(setUser(data));
      }
      navigation.navigate('HomePage');
    } catch (error) {
      if (error.data && error.data.message) {
        setLoginError(error.data.message);
      } else {
        setLoginError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'SIGN IN' && styles.activeTab]}
            onPress={() => handleTabPress('SIGN IN')}
          >
            <Text style={styles.tabText}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'REGISTER' && styles.activeTab]}
            onPress={() => handleTabPress('REGISTER')}
          >
            <Text style={styles.tabText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.heading}>HAVE AN ACCOUNT?</Text>
          <Text style={styles.subheading}>
            Sign in to speed up the checkout process and{'\n'}manage your orders
          </Text>
        </View>
        <View style={[styles.inputContainer, !userNameValid && styles.inputContainerError]}>
          <Ionicons name="mail-outline" size={20} style={styles.icon} />
          <TextInput
            ref={usernameInputRef}
            style={styles.input}
            placeholder="Email Address"
            onChangeText={(text) => {
              setUserName(text);
              setUserNameValid(true);
            }}
            value={username}
          />
        </View>
        {loginError && <Text style={styles.errorText}>{loginError}</Text>}
        <View style={[styles.inputContainer, !passwordValid && styles.inputContainerError]}>
          <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
          <TextInput
            ref={passwordInputRef}
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
              setPasswordValid(true);
            }}
            value={password}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
            <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>SIGN IN</Text>
        </TouchableOpacity>
        <Text style={styles.or}>OR</Text>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={20} />
          <Text style={styles.socialButtonText}>SIGN IN WITH APPLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-twitter" size={20} />
          <Text style={styles.socialButtonText}>SIGN IN WITH TWITTER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    content: {
      padding: width * 0.05,
    },
    tabs: {
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: '#eee',
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      padding: height * 0.02,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: '#000',
    },
    tabText: {
      fontSize: width * 0.055,
    },
    heading: {
      marginTop: height * 0.03,
      marginBottom: height * 0.01,
      fontSize: width * 0.050,
    },
    subheading: {
      marginTop: height * 0.01,
      marginLeft: height * 0.02,
      fontSize: width * 0.04,
      color: '#666',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#ccc',
      padding: height * 0.015,
      marginTop: height * 0.02,
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      height: 30,
    },
    icon: {
      marginRight: 10,
      color: '#666',
    },
    eyeIcon: {
      marginLeft: 10,
    },
    forgotPassword: {
      marginTop: height * 0.01,
      color: '#e84393',
      textAlign: 'right',
    },
    signInButton: {
      backgroundColor: '#000000',
      padding: height * 0.02,
      borderRadius: 5,
      marginTop: height * 0.02,
    },
    signInButtonText: {
      color: '#fff',
      fontSize: width * 0.04,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    or: {
      marginTop: height * 0.02,
      fontSize: width * 0.035,
      color: '#666',
      textAlign: 'center',
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: height * 0.02,
      borderRadius: 5,
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      marginTop: height * 0.03,
      justifyContent: 'center',
    },
    socialButtonText: {
      fontSize: width * 0.04,
      marginLeft: 10,
    },
    errorText: {
      color: 'red',
      fontSize: width * 0.04,
      marginTop: height * 0.01,
    },
    inputContainerError:{
      borderColor: 'red',
    }
});

export default Login_Screen;
