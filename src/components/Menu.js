import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const MenuItem = ({ title, children, iconName, onPress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation(); 

  const handleToggle = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <View style={styles.menuItem}>
      <TouchableOpacity
        style={styles.menuItemButton}
        onPress={onPress || handleToggle}
      >
        {iconName && <Icon name={iconName} size={24} color="#000" style={styles.menuIcon} />}  
        <Text style={styles.menuItemText}>{title}</Text>
        {children && (
          <Icon
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#000" 
            style={styles.arrowIcon}
          />
        )}
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.submenu}>
          {children}
        </ScrollView>
      )}
    </View>
  );
};

const Menu = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.menu}>
      <MenuItem title="MY ACCOUNT" iconName="person-outline">
        <MenuItem title="Profile" iconName="person-circle-outline" onPress={() => navigation.navigate("Profile")} />
        <MenuItem title="Settings" iconName="settings-outline" />
        <MenuItem title="Passwords" iconName="lock-closed-outline" />
        <MenuItem title="Orders" iconName="cart-outline" />
        <MenuItem title="Shipping Address" iconName="location-outline" />
        <MenuItem title="Email Notifications" iconName="mail-outline" />
      </MenuItem>
      <MenuItem title="CATEGORIES" iconName="grid-outline">
        <MenuItem title="Shirts" iconName="shirt-outline" />
        <MenuItem title="Jackets" iconName="coat-outline" />
        <MenuItem title="Sweaters" iconName="browsers-outline" />
        <MenuItem title="Jeans" iconName="leaf-outline" />
        <MenuItem title="Trousers" iconName="body-outline" />
        <MenuItem title="Shorts" iconName="paw-outline" />
        <MenuItem title="Dresses" iconName="female-outline" />
        <MenuItem title="Skirts" iconName="ribbon-outline" />
        <MenuItem title="Sets/Outfits" iconName="albums-outline" />
      </MenuItem>
      <MenuItem title="BRANDS" iconName="pricetag-outline">
        <MenuItem title="Cardigan" iconName="card-outline" />
        <MenuItem title="Gucci" iconName="pricetag-outline" />
        <MenuItem title="Versace" iconName="pricetag-outline" />
        <MenuItem title="HIU" iconName="pricetag-outline" />
        <MenuItem title="Adidas" iconName="logo-adidas" />
        <MenuItem title="Nice" iconName="star-outline" />
      </MenuItem>
      <MenuItem title="GENDER" iconName="body-outline" />
      <MenuItem title="COLLECTION" iconName="albums-outline" />
      <MenuItem title="CONTACT US" iconName="call-outline" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menu: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 3,
  },
  menuItem: {
    marginVertical: 5,
  },
  menuItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItemText: {
    fontSize: 18,
    color: '#333',
    flex: 1,
    marginLeft: 10, 
    fontWeight: '500',
  },
  menuIcon: {
    marginRight: 10,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  submenu: {
    marginTop: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginBottom: 5,
    paddingVertical: 8,
    maxHeight: 200, 
  },
});

export default Menu;
