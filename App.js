import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoadingScreen from './screens/loadingScreen';
import HomeScreen from './screens/homeScreen';
import LockScreen from './screens/lockScreen';


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="loading">
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="loading" component={LoadingScreen} />
        <Stack.Screen name="lock" component={LockScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;