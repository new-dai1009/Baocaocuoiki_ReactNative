import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { useSelector } from 'react-redux'; 

const WishlistButton = ({ productId }) => {
  const [wishlist, setWishlist] = useState(false);
  
  // Lấy thông tin người dùng từ Redux (giả sử bạn lưu trữ trong `user` object)
  const userId = useSelector((state) => state.user.user?.id); 

  const handleWishlist = async () => {
    if (!userId) {
      console.log('User not logged in');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/wishlistItems/add/:productId', 
        { productId, userId }
      );

      if (response.status === 200) {
        setWishlist(!wishlist);
        console.log(wishlist ? 'Removed from Wishlist' : 'Added to Wishlist');
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleWishlist}>
      <Icon
        name={wishlist ? 'heart' : 'hearto'}
        size={28}
        color={wishlist ? '#ff6200' : '#888'}
      />
    </TouchableOpacity>
  );
};

export default WishlistButton;

