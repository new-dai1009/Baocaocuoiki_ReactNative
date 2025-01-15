import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const NewArrival = ( ) => { 
  const [newArrival, setNewArrival] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [page, setPage] = useState(0);
  const navigation = useNavigation();
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchNewArrival = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products/new-arrivals");
        setNewArrival(response.data);
        setVisibleData(response.data.slice(0, itemsPerPage));
      } catch (error) {
        console.log("Error fetching new arrival data", error);
      }
    };
    fetchNewArrival();
  }, []);

  const handleNextPage = () => {
    const startIndex = (page + 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (startIndex < newArrival.length) {
      setPage(page + 1);
      setVisibleData(newArrival.slice(startIndex, endIndex));
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPage(page - 1);
      setVisibleData(newArrival.slice(startIndex, endIndex));
    }
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product}); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>NEW ARRIVAL</Text>
      <FlatList
        data={visibleData}
        numColumns={2}
        keyExtractor={(item) => item.product_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productContainer}
            onPress={() => handleProductPress(item)}
          >
            <Image source={{ uri: item.images[0]?.image_url || 'fallback_image_url' }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name.replace(/[\r\n]+/g, ' ')}</Text>
            <Text style={styles.categoryName}>{item.category.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.arrowContainer}>
        <TouchableOpacity
          style={[styles.arrowButton, page === 0 && styles.disabledButton]}
          onPress={handlePreviousPage}
          disabled={page === 0}
        >
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.arrowButton, (page + 1) * itemsPerPage >= newArrival.length && styles.disabledButton]}
          onPress={handleNextPage}
          disabled={(page + 1) * itemsPerPage >= newArrival.length}
        >
          <Text style={styles.arrowText}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 28,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: '#ccc',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
  },
  productContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: width * 0.4,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
    color: '#555',
  },
  categoryName: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#ff6200',
    marginTop: 4,
    fontWeight: '600',
  },
  arrowContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
  },
  arrowButton: {
    padding: 10,
    backgroundColor: '#ff6200',
    borderRadius: 50,
    alignItems: 'center',
    width: 40,
    marginHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  arrowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewArrival;
