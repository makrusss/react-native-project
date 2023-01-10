import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
      <Stack.Navigator screenOptions={{headerStyle:{backgroundColor: "gold"}}} initialRouteName="SplashScreen">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}
