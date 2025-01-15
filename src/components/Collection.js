import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Collection = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.heading}>COLLECTIONS</Text>
      {/* Ảnh đầu tiên */}
      <View style={styles.imageContainer}>
        <Image source={require('../img/image_collection_1.png')} style={styles.collectionImage} />
        <Text style={styles.imageText}>October Collection</Text>
      </View>

      {/* Ảnh thứ hai */}
      <View style={styles.imageContainer}>
        <Image source={require('../img/image_collection_2.png')} style={styles.collectionImageTwo} />
        <Text style={styles.imageText}>Autumn Collection</Text>
      </View>

      <View style={styles.containerChild}>
        {/* Ảnh video (ảnh thứ 3) với nút mũi tên ở giữa */}
        <View style={styles.videoContainer}>
          <Image source={require('../img/image_collection_3.png')} style={styles.collectionVideo} />
          <View style={styles.playButton}>
            <Text style={styles.arrowText}>▶</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginVertical:50
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
  imageContainer: {
    position: 'relative', 
    width: '100%',
    marginBottom: 10,
  },
  collectionImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  collectionImageTwo: {
    width: '80%',
    height: 300,
    borderRadius: 10,
    marginLeft:45,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  imageText: {
    position: 'absolute',
    top: 50,
    right: 35,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  containerChild: {
    flexDirection: 'column',
    alignItems: 'center',
    // marginTop: 10,
    width: '100%',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
  },
  collectionVideo: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Collection;
