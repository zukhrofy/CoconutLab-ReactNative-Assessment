import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Stack } from "expo-router";
import "./globals.css";

const client = new ApolloClient({
  uri: "https://staging-hasura-handyhand.findjobs.com.sg/v1/graphql",
  cache: new InMemoryCache(),
});

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ApolloProvider>
  );
}
