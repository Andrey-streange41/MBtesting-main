import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

export default function AccountPage({ userData: user }) {
 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.imageView}>
          {user.userAvatar ? (
            <Image source={{ uri: user.userAvatar }} style={styles.image} />
          ) : (
            <Text style={styles.text}>{user.name.charAt(0)}</Text>
          )}
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "Roboto-Bold" : "Roboto-Regular",
    paddingTop:120
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageView: {
    height: 200,
    width: 200,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    overflow: "hidden",
  },
  image: {
    height: 200,
    width: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  email: {
    fontSize: 16,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  editText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
