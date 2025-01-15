import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, TextInput, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu';
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';  // Make sure axios is installed

const { width } = Dimensions.get('window');

const Header = ({ title = "HiFaShiOn" }) => {
  const navigation = useNavigation(); 
  const [searchResults, setSearchResults] = useState([]);  // State for search results
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); 
  const slideAnim = useRef(new Animated.Value(-100)).current;

  // Function to handle search
  const handleSearchSubmit = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:3000/products/search?name=${searchTerm}`);
      setSearchResults(response.data || []);  // Set search results from the response
    } catch (error) {
      console.error('Error fetching search results:', error.message);
    }
  };

  const handleSearchPress = () => {
    setSearchVisible(prevState => !prevState);
    Animated.timing(slideAnim, {
      toValue: searchVisible ? -100 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleMenuPress = () => {
    setMenuVisible(prevState => !prevState);
  };

  const handleCartPress = () => {
    navigation.navigate("Cart");
  };

  const handleTitlePress = () => {
    navigation.navigate('HomePage'); 
  };

  const renderSearchResults = () => {
    if (searchResults.length === 0) return <Text>No results found</Text>;

    return (
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.product_id.toString()}  // Use the correct identifier for your products
        renderItem={({ item }) => (
          <View style={styles.searchResultItem}>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text> {/* Adjust to display other product details */}
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={handleMenuPress}
        accessibilityLabel="Menu"
      >
        <Icon name="menu" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={handleTitlePress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSearchPress}
          accessibilityLabel="Search"
        >
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleCartPress}
          accessibilityLabel="Cart"
        >
          <Icon name="cart" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Animated search bar */}
      <Animated.View style={[styles.searchContainer, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.searchInputContainer}>
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            onSubmitEditing={(e) => handleSearchSubmit(e.nativeEvent.text)}  // Submit on enter key
          />
          <TouchableOpacity style={styles.searchIcon} onPress={() => handleSearchSubmit('')}>
            <Icon name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Display search results */}
      {searchVisible && (
        <View style={styles.searchResultsContainer}>
          {renderSearchResults()}
        </View>
      )}

      {/* Modal for Menu */}
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.menuContainer}>
            <Menu />
            <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.closeButton}>
              <Icon name="close" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
    position: 'relative',
    zIndex: 1000,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 50,
  },
  menuButton: {
    padding: 10,
  },
  title: {
    fontSize: 35,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'DancingScript',
    textShadowColor: '#aaa',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 10,
    marginLeft: 10,
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    zIndex: 999,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  searchIcon: {
    padding: 10,
  },
  searchResultsContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    zIndex: 999,
  },
  searchResultItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: width - 40,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Header;
