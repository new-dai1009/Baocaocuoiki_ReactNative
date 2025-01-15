import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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
import { registerUser } from '../constant/auth/api';

const { width, height } = Dimensions.get('window');

const Register_Screen = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('REGISTER');
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === 'SIGN IN') {
      navigation.navigate('Login');
    }
  };

  const handleRegister = async () => {
    if (!first_name || !last_name || !username || !password) {
      alert('Error', 'All fields are required!');
      return;
    }
    const userData = { first_name, last_name, username, password };

    try {
      const response = await registerUser(userData);
      console.log('Registration successful', response);
      alert("Đăng Kí Tài Khoản Thành Công");
      navigation.navigate('Login');

    } catch (error) {
      console.error('Registration failed', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); 
      } else {
        alert("Error", "An unexpected error occurred.");
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
          <Text style={styles.heading}>NEW TO OPENFASHION</Text>
          <Text style={styles.subheading}>Register to speed up the checkout process and manage your orders</Text>
        </View>

        <View style={styles.inputNameContainer}>
          <Ionicons name="person-outline" size={20} color="black" style={styles.iconStyle}/>
          <TextInput
            style={styles.inputName}
            placeholder="First name"
            onChangeText={setFirstName}
            value={first_name}
          />
          <Ionicons name="person-outline" size={20} color="black" style={styles.iconStyle}/>
          <TextInput
            style={styles.inputName1}
            placeholder="Last name"
            onChangeText={setLastName}
            value={last_name}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="black" style={styles.iconStyle}/>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            onChangeText={setUserName}
            value={username}
          />
        </View>

        <View style={styles.passwordContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.iconStyle}/>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleRegister}>
          <Text style={styles.signInButtonText}>REGISTER NOW</Text>
        </TouchableOpacity>

        <Text style={styles.or}>OR</Text>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={24} color="black"/>
          <Text style={styles.socialButtonText}>SIGN IN WITH APPLE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-twitter" size={24} color="black"/>
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
  inputNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: height * 0.01,
  },
  inputName: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: height * 0.01,
    marginTop: height * 0.03,
    fontSize: width * 0.04,
    height: height * 0.06,
  },
  inputName1: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: height * 0.01,
    marginTop: height * 0.03,
    fontSize: width * 0.04,
    height: height * 0.06,
    width:"50%"
  },
  iconStyle: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop: height * 0.02,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    padding: height * 0.01,
    borderRadius: 5,
    fontSize: width * 0.04,
    height: height * 0.06, 
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop: height * 0.02,
  },
  inputPassword: {
    flex: 1,
    padding: height * 0.01,
    borderRadius: 5,
    fontSize: width * 0.04,
    height: height * 0.06, 
  },
  eyeIcon: {
    padding: 10,
  },
  signInButton: {
    backgroundColor: '#000000',
    padding: height * 0.02,
    borderRadius: 5,
    marginTop: height * 0.04,
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
    marginTop: height * 0.01,
    justifyContent: 'center',
  },
  socialButtonText: {
    fontSize: width * 0.04,
    marginLeft: 10,
  },
});

export default Register_Screen;
