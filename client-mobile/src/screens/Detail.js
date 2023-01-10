import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import TopBar from "../components/TopBar";
import { GET_PRODUCT_DETAIL } from "../queries/product";
import { useQuery } from "@apollo/client/react/hooks";
import formatRupiah from "../helpers/currency";

export default function Detail({ route }) {
  const { id } = route.params;
  // console.log(id,`<<<<<<<<<`)
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL, {
    variables: {
      getProductId: id,
    },
  });
  // if(error) console.log(error,`<<<ERROR<<`)

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={"black"} />
      </View>
    );
  }
  
  // if (data) console.log(data);
  // else console.log(`data null`);

  let item = data.getProduct;
  return (
    <>
      <TopBar />

      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Image style={styles.image} source={{ uri: item.mainImg }} />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{formatRupiah(item.price)}</Text>
            <Text style={styles.description}>{item.description}</Text>
            {item.slug && <Text style={styles.description}>{item.slug}</Text>}
            {item.user.email && (
              <Text style={styles.description}>
                Design By: {item.user.email}
              </Text>
            )}
            {item.Images && (
              <View style={styles.tagContainer}>
                {item.Images.map((img, index) => {
                  return (
                    <Image
                      key={index}
                      style={styles.img}
                      source={{ uri: img.imgUrl }}
                    />
                  );
                })}
              </View>
            )}
            <Button color={"black"} title="Add to Cart" />
          </View>
        </View>
      </View>
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
    maxWidth: 200,
    fontSize: 30,
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
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  img: {
    padding: 8,
    overflow: "hidden",
    width: 80,
    height: 80,
    backgroundColor: "gold",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 3,
  },
});
