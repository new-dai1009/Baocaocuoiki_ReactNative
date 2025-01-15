import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StarLine = () => {
  return (
    <View style={styles.container}>
      {/* Ngôi sao lớn nhất ở chính giữa */}
      <Ionicons name="star" size={5} color="#999999" style={styles.icon} />
      {/* Ngôi sao gần giữa */}
      <Ionicons name="star" size={10} color="#999999" style={styles.icon} />
      {/* Ngôi sao nhỏ hơn */}
      <Ionicons name="star" size={15} color="#999999" style={styles.icon} />
      {/* Ngôi sao nhỏ hơn nữa */}
      <Ionicons name="star" size={10} color="#999999" style={styles.icon} />
      {/* Ngôi sao nhỏ nhất */}
      <Ionicons name="star" size={5} color="#999999" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center', // Căn giữa các ngôi sao
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    marginHorizontal: 5, // Khoảng cách giữa các ngôi sao
  },
});

export default StarLine;
