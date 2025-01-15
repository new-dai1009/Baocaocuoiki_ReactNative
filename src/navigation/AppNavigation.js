import { createStackNavigator } from '@react-navigation/stack';
import Login_Screen from '../screens/Login_Screen';
import Register_Screen from '../screens/Register_Screen';
import HomePage_Screen from '../screens/HomePage_Screen';
import Product_Detail from '../screens/Product_Detail';
import NewArrival from '../components/NewArrival';
import Menu from '../components/Menu';
import Profile from '../screens/Profile';
import CartScreen from '../screens/Cart';
import AssistantChatBox from '../components/ChatAI';


const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name='Login' 
        component={Login_Screen} 
        options={{ headerShown: false }}
        screenOptions={{
        gestureEnabled: true, 
        gestureDirection: 'horizontal', 
      }}  
      />
      <Stack.Screen 
        name='Register'
        component={Register_Screen}
        options={{headerShown:false}}
    />
    <Stack.Screen
      name='HomePage'
      component={HomePage_Screen}
      options={{headerShown:false}}


    />
    <Stack.Screen 
      name='ProductDetail'
      component={Product_Detail}
      options={{
          headerShown: false,
          gestureResponseDistance: {
            horizontal: 300, 
          },
        }}
      />
      <Stack.Screen 
      name="NewArrival" 
      component={NewArrival} 
      options={{headerShown:false}}
      />
      <Stack.Screen name='Menu'
      component={Menu}
      options={{headerShown:false}}
      />
        <Stack.Screen name='Profile'
        component={Profile}
        options={{headerShown:false}}
        />
      <Stack.Screen name='Cart'
        component={CartScreen}
        options={{headerShown:false}}
      />
      <Stack.Screen name='Chat'
        component={AssistantChatBox}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
    
  );
};

export default AppNavigation;
