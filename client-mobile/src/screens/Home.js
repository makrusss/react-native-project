import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
  ActivityIndicator
} from "react-native";
import TopBar from "../components/TopBar";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../queries/product";

export default function Home({ navigation }) {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const renderItem = ({ item }) => {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Image style={styles.image} source={{ uri: item.mainImg }} />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Button
                color={"black"}
                title="More Detail"
                onPress={() =>
                  navigation.navigate("Detail", {
                    id: item.id,
                  })
                }
              />
            </View>
          </View>
        </View>
      </>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={"black"} />
      </View>
    );
  }

  return (
    <>
      <TopBar />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data.getProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    fontSize: 30,
    maxWidth: 200,
    marginVertical: 7,
  },
  contentContainer: {
    padding: 10,
  },
  description: {
    fontSize: 15,
    maxWidth: 200,
    textAlign: "justify",
    marginBottom: 15,
  },
});
