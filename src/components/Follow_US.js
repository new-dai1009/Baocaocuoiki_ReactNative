import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const data = [
  { id: 1, name: '@mia', img: "https://i.postimg.cc/3JhMjS2K/Rectangle-332-Followus.png" },
  { id: 2, name: '@_jihyn', img: "https://i.postimg.cc/7YnFK3NS/Rectangle-333-Followus.png" },
  { id: 3, name: '@xeko', img: "https://i.postimg.cc/nhd6Jngz/Rectangle-334-Followus.png" },
  { id: 4, name: '@new_bwhite', img: "https://i.postimg.cc/fRW6pVHp/Rectangle-335-Followus.png" },
];

const Follow_Us = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>FOLLOW US</Text>
      <FontAwesome5 name="instagram" size={30} color="#999" style={styles.icon} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer} 
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.img }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  icon: {
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    width: '45%', 
    margin: 10,
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  image: {
    width: 170, 
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  text: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default Follow_Us;
