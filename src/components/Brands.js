// Brands.js
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const brands = [
  { id: '1', name: 'Brand 1', logo: 'https://aitvietnam.com/wp-content/uploads/2022/01/logo-cac-thuong-hieu-thoi-trang-noi-tieng-1.png' },
  { id: '2', name: 'Brand 2', logo: 'https://file.hstatic.net/200000503583/file/logo-cac-thuong-hieu-thoi-trang-noi-tieng-2_ddc6d2c3b92d4df78da97413d70a7a8e.jpg' },
  { id: '3', name: 'Brand 1', logo: 'https://aitvietnam.com/wp-content/uploads/2022/01/logo-cac-thuong-hieu-thoi-trang-noi-tieng-4.jpg' },
  { id: '4', name: 'Brand 2', logo: 'https://mcdn.coolmate.me/image/November2023/logo-thuong-hieu-thoi-trang-2576_289.jpg' },
  { id: '5', name: 'Brand 1', logo: 'https://file.hstatic.net/200000503583/file/logo-cac-thuong-hieu-thoi-trang-noi-tieng-7_265c84a82af1456a9676f5f6c5a23255.jpg' },
  { id: '6', name: 'Brand 2', logo: 'https://img.freepik.com/premium-vector/simple-fashion-business-logo-illustration_278222-7354.jpg' },
];

const Brands = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BRANDS</Text>
      <FlatList
        data={brands}
        numColumns={3}
        // horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.brandContainer}>
            <Image source={{ uri: item.logo }} style={styles.brandLogo} />
            {/* <Text>{item.name}</Text> */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 30, 
    fontStyle: 'italic', 
    fontFamily: 'serif', 
    color: '#000000', 
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: '#aaa',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2, 
  },
  brandContainer: {
    flex: 1,
    marginRight: 16,
    alignItems: 'center',
  },
  brandLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Brands;
