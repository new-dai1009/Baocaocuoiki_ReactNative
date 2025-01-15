import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

// const recommendedProducts = [
//   { id: '1', name: 'Product A', price: '$80', image: 'https://i.postimg.cc/Y9bMNGMM/Rectangle-326.png' },
//   { id: '2', name: 'Product B', price: '$60', image: 'https://i.postimg.cc/Y9bMNGMM/Rectangle-326.png' },
//   { id: '3', name: 'Product C', price: '$90', image: 'https://i.postimg.cc/Y9bMNGMM/Rectangle-326.png' },
//   { id: '4', name: 'Product D', price: '$70', image: 'https://i.postimg.cc/Y9bMNGMM/Rectangle-326.png' },
//   { id: '5', name: 'Product E', price: '$80', image: 'https://i.postimg.cc/Y9bMNGMM/Rectangle-326.png' },
//   { id: '6', name: 'Product F', price: '$60', image: 'https://i.postimg.cc/Y9bMNGMM/Rectangle-326.png' },
//   { id: '7', name: 'Product G', price: '$90', image: 'https://i.postimg.cc/Y9bMNGMM/Rectangle-326.png' },
//   { id: '8', name: 'Product H', price: '$70', image: 'https://i.postimg.cc/Y9bMNGMM/Rectangle-326.png' },
//   { id: '9', name: 'Product I', price: '$60', image: 'https://i.postimg.cc/Y9bMNGMM/Rectangle-326.png' },
//   { id: '10', name: 'Product J', price: '$90', image: 'https://i.postimg.cc/Y9bMNGMM/Rectangle-326.png' },
// ];

const JustForYou = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 3;
  const [products, setProducts] = useState([]);




  useEffect(() =>{
    const fecthdata = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products/new-arrivals");
      setProducts(response.data)
    } catch (error) {
      console.log("Erorr fetch products", error)
    }
  }
  fecthdata();
  }, [])
  
  // Hàm để chuyển sang trang tiếp theo
  const goToNextPage = () => {
    if ((currentPage + 1) * productsPerPage < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Hàm để chuyển về trang trước đó
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Cắt mảng sản phẩm theo trang hiện tại
  const currentProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>JUST FOR YOU</Text>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={goToPreviousPage} style={styles.arrowButton}>
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>

        <FlatList
          data={currentProducts}
          horizontal={true}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Image source={{  uri: item.images[0]?.image_url || 'fallback_image_url'}} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />

        <TouchableOpacity onPress={goToNextPage} style={styles.arrowButton}>
          <Text style={styles.arrowText}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  heading: {
    fontSize: 24,
    fontStyle: 'italic',
    fontFamily: 'serif',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: '#bbb',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1.5,
  },
  flatListContent: {
    paddingBottom: 16,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  arrowButton: {
    justifyContent: 'center',
    alignItems: 'center',
  //   paddingVertical: 2,
  //   paddingHorizontal: 2,
  //   backgroundColor: '#ffffff',
  //   borderRadius: 2,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 1, height: 1 },
  //   shadowOpacity: 0.15,
  //   shadowRadius: 3,
  //   elevation: 2,
  //   borderColor: '#d3d3d3',
  //   borderWidth: 1,
  },
  arrowText: {
    fontSize: 13,
    color: '#999999',
  },
  productContainer: {
    width: 130,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  productImage: {
    width: 110,
    height: 160,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  productName: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  productPrice: {
    marginTop: 4,
    color: '#888',
    textAlign: 'center',
    fontSize: 13,
  },
});


export default JustForYou;
