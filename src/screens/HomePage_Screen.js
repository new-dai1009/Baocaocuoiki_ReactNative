import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View, Animated, Easing } from 'react-native';
import BannerCarousel from '../components/BannerCarousel';
import Footer from '../components/Footer';
import NewArrival from '../components/NewArrival';
import Brands from '../components/Brands';
import JustForYou from '../components/JusForYou';
import Follow_Us from '../components/Follow_US';
import Collection from '../components/Collection';
import Trending from '../components/Trending';
import { useNavigation } from '@react-navigation/native';  // Import hook useNavigation
import Icon from 'react-native-vector-icons/Ionicons';

const HomePage_Screen = () => {
    const navigation = useNavigation();  // Declare navigation hook to navigate
    const [shakeValue, setShakeValue] = useState(new Animated.Value(0));  // For shake effect

    // Function to handle the chat click and navigate to the chat screen
    const handleChatClick = () => {
        navigation.navigate('Chat'); 
    };

    // Function for shake effect
    const shake = () => {
        setShakeValue(new Animated.Value(0));
        Animated.sequence([
            Animated.timing(shakeValue, {
                toValue: 50,  // Increase shake value
                duration: 70,  // Increase duration for more impact
                easing: Easing.bounce,
                useNativeDriver: true,
            }),
            Animated.timing(shakeValue, {
                toValue: -20,  // Increase shake value
                duration: 70,
                easing: Easing.bounce,
                useNativeDriver: true,
            }),
            Animated.timing(shakeValue, {
                toValue: 20,  // Increase shake value
                duration: 70,
                easing: Easing.bounce,
                useNativeDriver: true,
            }),
            Animated.timing(shakeValue, {
                toValue: 0,
                duration: 70,
                easing: Easing.bounce,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Banner */}
                <BannerCarousel />
                {/* New Arrival */}
                <NewArrival />
                {/* Brands */}
                <Brands />
                {/* Collection */}
                <Collection />
                {/* Just For You */}
                <JustForYou />
                {/* Trending */}
                <Trending />
                {/* FoLLow Us */}
                <Follow_Us />
                {/* Footer */}
                <Footer />
            </ScrollView>

            {/* Floating Buttons */}
            <View style={styles.buttonContainer}>
                {/* Chat Button */}
                <Animated.View style={[styles.iconContainer, { transform: [{ translateX: shakeValue }] }]}>
                    <TouchableOpacity onPress={() => { shake(); handleChatClick(); }}>
                        <Icon name="chatbubble-ellipses" size={28} color="#fff" />  {/* Slightly larger icon */}
                    </TouchableOpacity>
                </Animated.View>

                {/* Message Button */}
                <Animated.View style={[styles.iconContainer, { transform: [{ translateX: shakeValue }] }]}>
                    <TouchableOpacity onPress={() => { shake(); }}>
                        <Icon name="mail" size={28} color="#fff" />  {/* Slightly larger icon */}
                    </TouchableOpacity>
                </Animated.View>

                {/* Phone Button */}
                <Animated.View style={[styles.iconContainer, { transform: [{ translateX: shakeValue }] }]}>
                    <TouchableOpacity onPress={() => { shake(); }}>
                        <Icon name="call" size={28} color="#fff" />  {/* Slightly larger icon */}
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    scrollContent: {
        paddingBottom: 0,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconContainer: {
        backgroundColor: '#ff6347',  // Changed to a more noticeable color (Tomato)
        width: 60,  // Increased width
        height: 60,  // Increased height
        borderRadius: 30,  // Maintain circular shape
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,  // Adjusted margin for better spacing
        elevation: 4,
        zIndex: 1000,
    },
});

export default HomePage_Screen;
