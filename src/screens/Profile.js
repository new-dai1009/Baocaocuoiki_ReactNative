import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const Profile = () => {
  const [avatar, setAvatar] = useState("https://i.postimg.cc/gjM9hVnQ/avt-defaut.jpg");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const user = useSelector(state => state.user.user.user);
  const addresses = useSelector(state => state.user.addresses);
  const userId = useSelector(state => state.user.user.user.user_id);
  const dispatch = useDispatch();
  const API_URL = 'http://localhost:3000/users';

  useEffect(() => {
    if (userId) {
      const fetchGetUserAddress = async (userId) => {
        try {
          const response = await axios.get(`${API_URL}/${userId}/addresses`);
          dispatch({ type: 'SET_ADDRESS_USER', payload: response.data });
          setSelectedAddress(response.data[0]);
        } catch (error) {
          console.error("Error fetching user address:", error);
        }
      };
      fetchGetUserAddress(userId);
    }
  }, [userId, dispatch]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera roll permission is required!');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setModalVisible(false);
  };

  if (!user || !addresses) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return ( 
    <ScrollView style={styles.container}>
      {/* Title Section */}
      <Text style={styles.title}>PROFILE</Text>

      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={pickImage}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="person-outline" size={50} color="#aaa" />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.avatarText}>Tap to change profile picture</Text>
      </View>

      {/* User Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Icon name="person" size={24} color="black" style={styles.infoIcon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.infoText}>{user.first_name}{user.last_name}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Icon name="mail" size={24} color="black" style={styles.infoIcon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.infoText}>{user.username}</Text>
          </View>
        </View>
      </View>

      {/* Address Section */}
      {selectedAddress ? (
        <View style={styles.addressSection}>
          <Text style={styles.sectionTitle}>
            <Icon name="location" size={20} color="black" /> Address:
          </Text>
          <View style={styles.addressItem}>
            <Text style={styles.addressText}>{selectedAddress.street_address}</Text>
            <Text style={styles.addressText}>{selectedAddress.city}, {selectedAddress.state} {selectedAddress.postal_code}</Text>
            <Text style={styles.addressText}>{selectedAddress.country}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectAddressButton}>
              <Icon name="chevron-down" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.noAddressText}>
          <Icon name="alert-circle" size={20} color="#888" /> No address selected
        </Text>
      )}

      {/* Modal to select address */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              <Icon name="list" size={20} color="black" /> Choose an Address
            </Text>
            <FlatList
              data={addresses}
              keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectAddress(item)} style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{item.street_address}</Text>
                  <Text style={styles.modalItemText}>{item.city}, {item.state} {item.postal_code}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>
                <Icon name="close" size={16} color="#fff" /> Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: '#888',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    color: '#333',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoTextContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  addressSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    marginRight: 10,
  },
  selectAddressButton: {
    marginLeft: 'auto',
  },
  noAddressText: {
    fontSize: 16,
    color: '#888',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Profile;
