import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Product_Detail = ({ route }) => {
  const { product } = route.params;
  const [wishlist, setWishlist] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Truy cập thông tin người dùng từ Redux Store
  const userId = useSelector((state) => state.user.user.user.user_id);

  // Fetch wishlist items from server
  const fetchWishlistItems = async () => {
    if (!userId) {
      console.log('User ID is missing');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/wishlistItems?userId=${userId}`);
      if (response.data) {
        setWishlistItems(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log('Error fetching wishlist:', error);
    }
  };

  const checkWishlist = () => {
    // Kiểm tra nếu sản phẩm đã có trong wishlist
    const productInWishlist = wishlistItems.some((item) => item.product.product_id === product.product_id);
    setWishlist(productInWishlist); // Cập nhật trạng thái wishlist
  };

  const handleWishlist = async () => {
    if (!userId) {
      alert('Thông báo Bạn cần đăng nhập để sử dụng chức năng này!');
      return;
    }

    // Thêm sản phẩm vào wishlist (chỉ thêm không xóa)
    const url = `http://localhost:3000/wishlistItems/add/${product.product_id}`;
    const body = { userId };

    try {
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        alert('Thông báo Đã thêm vào danh sách yêu thích');
        
        // Gọi lại để fetch danh sách wishlist
        fetchWishlistItems();
      } else {
        alert('Lỗi Không thể thêm sản phẩm vào wishlist!');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Sản phẩm đã có trong danh sách yêu thích!');
      }
    }
  };

  // Gọi API lấy danh sách wishlist khi component render
  useEffect(() => {
    if (userId) {
      fetchWishlistItems();
    }
  }, [userId]);

  // Kiểm tra nếu sản phẩm đã có trong wishlist mỗi khi wishlistItems thay đổi
  useEffect(() => {
    checkWishlist();
  }, [wishlistItems]);

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!userId) {
      alert('Thông báo Bạn cần đăng nhập để sử dụng chức năng này!');
      return;
    }

    const url = 'http://localhost:3000/carts/add'; 
    const body = {
      userId,
      productId: product.product_id,
      quantity: 1, 
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        alert('Sản phẩm đã được thêm vào giỏ hàng');
      } else {
        alert('Lỗi: Không thể thêm sản phẩm vào giỏ hàng');
      }
    } catch (error) {
      console.log('Error adding product to cart:', error);
      alert('Đã có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: product.images[0]?.image_url || 'fallback_image_url' }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.categoryName}>{product.category.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleWishlist} style={styles.wishlistButton}>
        <Icon name={wishlist ? 'heart' : 'hearto'} size={28} color={wishlist ? 'red' : '#888'} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingBottom: 50,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginBottom: 16,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  categoryName: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff6200',
    textAlign: 'center',
    marginBottom: 12,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: '#ff6200',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 5,
    width: '100%',
  },
  addToCartText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  wishlistButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});

export default Product_Detail;
