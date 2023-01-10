import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
} from "react-native";

export default function TopBar() {
  return (
    <View style={styles.bar}>
      <Image
        style={styles.imageBar}
        source={require("../../assets/brand-p3-c2.png")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  bar: {
    backgroundColor: "black",
    height: 52,
  },
  imageBar: {
    marginStart: 10,
    marginTop:5,
    height: 40,
    width: 60,
  },
});
