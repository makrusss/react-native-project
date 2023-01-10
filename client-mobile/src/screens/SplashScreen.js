import { useEffect } from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 2000);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Image source={require("../../assets/brand-p3-c2.png")} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
});
