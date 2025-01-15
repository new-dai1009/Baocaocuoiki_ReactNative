import { StyleSheet, View, Text } from "react-native";

const Trending = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.heading}>@TRENDING</Text>
            <View style={styles.trendingOne}>
                <Text style={styles.hashtagText}>#2021</Text>
                <Text style={styles.hashtagText}>#spring</Text>
                <Text style={styles.hashtagText}>#collection</Text>
                <Text style={styles.hashtagText}>#fall</Text>
            </View>
            <View style={styles.trendingTwo}>
                <Text style={styles.hashtagText}>#dress</Text>
                <Text style={styles.hashtagText}>#autumncollection</Text>
                <Text style={styles.hashtagText}>#openfashion</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: '#f9f9f9',
    },
    trendingOne: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        marginBottom: 10,
        marginLeft:12
    },
    trendingTwo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft:6

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
    hashtagText: {
        marginLeft:9,
        marginRight: 7,
        marginBottom: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#fff',
        borderRadius: 15,
        fontSize: 14,
        color: '#333',
    },
});

export default Trending;
