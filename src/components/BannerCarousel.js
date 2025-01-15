import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';

const BannerCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const images = [
    'https://1102style.vn/wp-content/uploads/2024/01/shop-quan-ao-gucci-nu-5.jpg',
    'https://cdn.gumac.vn/image2/anh-tin-tuc/size-quan-ao-chau-au/bang-size-quan-ao-nu-chau-au060420221145500237.jpg',
    'https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2024/11/4/8-17307303631961053710368-118-0-743-1000-crop-17307305298151672798962.jpg',
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      fadeIn();
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.bannerContainer, { opacity: fadeAnim }]}>
      <Image
        source={{ uri: images[currentImageIndex] }}
        style={styles.bannerImage}
      />
      <View style={styles.overlay} />
      <Text style={styles.bannerText}>Welcome to HiFaShiOn</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10, 
    margin: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
  },
  bannerText: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal:16,
    textShadowColor: '#ccc',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
    position:'absolute'
  },
});

export default BannerCarousel;
