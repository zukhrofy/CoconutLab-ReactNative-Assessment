import { gql, useQuery } from "@apollo/client";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// query to fetch data
const GET_FRESH_MARKET_QUERY = gql`
  query GetFreshMarket {
    fresh_market(order_by: { order: asc }) {
      name
      order
    }
  }
`;

interface FreshMarket {
  name: string;
  order: number;
}

export default function Index() {
  // import images
  const heroImg = require("@/assets/images/banner.png");
  const backgroundImg = require("@/assets/images/background.png");
  const shopImg = require("@/assets/images/shop.png");

  // calculations for responsive banner
  const windowWidth = Dimensions.get("window").width;
  const { width: imgWidth, height: imgHeight } =
    Image.resolveAssetSource(heroImg);
  const imgAspectRatio = imgWidth / imgHeight;
  const heroHeight = windowWidth / imgAspectRatio;

  // fetch data from GraphQL
  const { loading, error, data, refetch } = useQuery(GET_FRESH_MARKET_QUERY);

  return (
    <View className="flex-1">
      {/* banner image */}
      <Image
        source={heroImg}
        style={{ width: "100%", height: heroHeight }}
        resizeMode="contain"
      />
      {/* main content */}
      <View className="flex-1">
        {/* loading condition */}
        {loading && (
          <View className="flex-1 justify-center items-center">
            <Text>Loading...</Text>
          </View>
        )}
        {/* error condition */}
        {error && (
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-center text-red-500 mb-4">
              Waduh, terjadi kesalahan saat mengambil data.
            </Text>
            <TouchableOpacity
              onPress={() => refetch()}
              className="bg-blue-500 px-4 py-2 rounded-lg">
              <Text className="text-white font-bold">Coba Lagi</Text>
            </TouchableOpacity>
          </View>
        )}
        {data && (
          <>
            <Image
              source={backgroundImg}
              className="absolute inset-0 w-full h-full z-0"
            />

            <ScrollView
              contentContainerStyle={{
                paddingBottom: 40,
                paddingTop: 40,
              }}>
              {[...data.fresh_market].map((item: FreshMarket) => (
                // wrapper for each item
                <View
                  key={item.order}
                  className={`w-full flex-row ${
                    item.order % 2 === 0 ? "justify-end" : "justify-start"
                  }`}>
                  {/* shop image and name */}
                  {/* dengan asumsi bagian putih atau fillable area adalah 2/5 dari lebar layar */}
                  <View className="flex items-center px-9 w-2/5">
                    {/* shop img */}
                    <View className="w-full aspect-square mb-4 overflow-hidden">
                      <Image
                        source={shopImg}
                        className="w-full h-full"
                        resizeMode="contain"
                      />
                    </View>
                    {/* shop title */}
                    <Text
                      className="text-lg font-semibold text-center tracking-tighter leading-none"
                      numberOfLines={2}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}
