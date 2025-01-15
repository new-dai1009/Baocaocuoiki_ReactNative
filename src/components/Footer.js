import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Line_star from './Line_star';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.socialIconsContainer}>
        <TouchableOpacity>
          <FontAwesome5 name="twitter" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="instagram" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="youtube" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Line_star />
        <Text style={styles.infoText}>Support@HiFashion.com</Text>
        <Text style={styles.infoTextCenter}>+60 825 876</Text>
        <Text style={styles.infoText}>08:00 - 22:00 - Everyday</Text>
        <Line_star />
      </View>
      <View style={styles.linksContainer}>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Blog</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyrightText}>Copyright© HiFashion All Rights Reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    marginBottom: 15,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 2,
    fontStyle: 'italic', 
    fontWeight: 'bold',  
  },
  infoTextCenter: {
    fontSize: 16,
    color: '#222',
    marginVertical: 6,
    fontWeight: 'bold',
    fontStyle: 'italic', 
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  link: {
    paddingHorizontal: 10,
  },
  linkText: {
    fontSize: 20,
    color: '#555555',
    fontStyle: 'italic', 
    fontWeight: 'bold', 
  },
  copyrightContainer: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    fontWeight: 'bold', 
  },
});

export default Footer;
