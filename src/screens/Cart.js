import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = useSelector((state) => state.user.user.user.user_id);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/carts/${userId}`);
        setCartItems(response.data.cartItems || []);
        calculateTotalPrice(response.data.cartItems);
      } catch (err) {
        setError('Failed to load cart items.');
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach(item => {
      total += item.product.price * item.quantity;
    });
    setTotalPrice(total);
  };

  const handleQuantityChange = (itemId, action) => {
    const updatedItems = cartItems.map(item => {
      if (item.cart_item_id === itemId) {
        const updatedQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        item.quantity = updatedQuantity > 0 ? updatedQuantity : 1; // Prevent negative quantity
      }
      return item;
    });

    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems); // Recalculate total price
  };

  const handleOrder = () => {
    // Logic for placing the order (e.g., API request)
    alert('Order placed!');
    console.log(item.product.imageUrl);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff6200" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length > 0 ? (
        <FlatList
  data={cartItems}
  keyExtractor={(item) => item.cart_item_id.toString()}
  renderItem={({ item }) => {
    return (
      <View style={styles.itemContainer}>
        {/* Hiển thị hình ảnh sản phẩm */}
        <Image source={{ uri: item.product.images[0]?.image_url }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.itemText}>{item.product.name}</Text>
          <Text style={styles.itemText}>${item.product.price.toFixed(2)}</Text>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => handleQuantityChange(item.cart_item_id, 'decrease')}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => handleQuantityChange(item.cart_item_id, 'increase')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }}
/>
      ) : (
        <Text style={styles.emptyText}>Your cart is empty</Text>
        
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.orderButtonText}>Place Order</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#555',
  },
  circleButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  orderButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ff6200',
    borderRadius: 10,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartScreen;
