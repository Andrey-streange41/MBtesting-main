import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { gStyle } from "./Style/style";
import HomepageStack from "./navigate";
import {
  getItemFromAsyncStorage,
  storeItemToAsyncStorage,
} from "./components/AsyncStorageMethods";
import * as Font from "expo-font";
import Splash from "./components/Splash";
import { fetchUsers } from "./api/users";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [usersLoading, setUsersLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState([]);

  const usersPerPage = 8;
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);

  // font loading
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
        "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
      },
      );
      setTimeout(() => {
        setFontLoaded(true);
      }, 2000);
    }
    loadFonts();
  }, []);

  const getNewData = async () => {
    const newItem = await getItemFromAsyncStorage("user");
    if (newItem) {
      setUserData(newItem);
    }
  };

  // users fetching here
  useEffect(() => {
    (async function () {
      setUsersLoading(true);
      const response = await fetchUsers(page);
      setUsers([...users, ...response.data]);
      setUsersLoading(false);
      setRefreshing(false);
    })();
  }, [page]);

  // save user to store
  useEffect(() => {
    if (users[0]) {
      storeItemToAsyncStorage("user", users[0]);
    }
    getNewData()
  }, [users]);

  if (!fontLoaded) {
    return <Splash />;
  }

  return (
    <View style={gStyle.main}>
      <HomepageStack
        setRefreshing={setRefreshing}
        users={displayedUsers}
        userData={userData}
        refreshing={refreshing}
        setPage={setPage}
        setUsers={setUsers}
        page={page}
      />
    </View>
  );
}
