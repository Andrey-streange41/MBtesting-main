import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";

//import {getItemFromAsyncStorage, mergeItemInAsyncStorage, deleteItemFromAsyncStorage} from './AsyncStorageMethods'

export default function HomePage({
  users,
  setRefreshing,
  refreshing,
  setPage,
  setUsers,
  page,
}) {
  /// main navigation usage
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Image style={styles.avatar} source={{ uri: item.userAvatar }} />
      <Text style={styles.email}>{item.email}</Text>
      
    </View>
  );

  const renderFooter = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setPage(page + 1);
        }}
        style={styles.loadMoreButton}
      >
        <Text style={styles.loadMoreButtonText}>Load More</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.homeView}>
          <Text style={styles.text}>Users list: </Text>
        </View>
        <FlatList
          style={styles.usersList}
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item._id.toString() + Math.random().toString().substring(10)
          }
          ListFooterComponent={renderFooter}
          refreshing={refreshing}
          onRefresh={() => {
            setPage(1);
            setUsers([]);
            setRefreshing(true);
          }}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 0,
    paddingTop: 44,
    fontFamily: Platform.OS === "ios" ? "Roboto-Thin" : "Roboto-Regular",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  homeView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "left",
  },
  text: {
    fontFamily: Platform.OS === "ios" ? "Roboto-Thin" : "Roboto-Regular",
    fontSize: 38,
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    fontFamily: Platform.OS === "ios" ? "Roboto-Bold" : "Roboto-Regular",
    fontSize: 16,
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loadMoreButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  loadMoreButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  usersList: {
    marginBottom: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  email:{
    fontFamily: Platform.OS === "ios" ? "Roboto-Thin" : "Roboto-Regular",
  }
});
