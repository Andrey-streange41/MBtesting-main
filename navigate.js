import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomePage from "./components/HomePage";
import AccountPage from "./components/AccountPage";
import Settings from "./components/Settings";

const Stack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SettingStack = createNativeStackNavigator();

const defaultStackNavigatorOptions = {
    headerStyle: {
      backgroundColor: "#fff",
    },
    headerShadowVisible: true,
    headerBackTitleVisible: true,
} 

function LogoTitle() {
  return (
    <Image
      style={{
        width: 128,
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 8,
      }}
      source={require("./assets/mainicon.png")}
    />
  );
}

function HomeStack({ userData, users, setRefreshing, refreshing, setPage, page,setUsers }) {
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultStackNavigatorOptions,
        headerTitle: "Home",
      }}
    >
      <Stack.Screen
        name="HomePage"
        children={() => (
          <HomePage
            setRefreshing={setRefreshing}
            users={users}
            userData={userData}
            refreshing={refreshing}
            setPage={setPage}
            page={page}
            setUsers={setUsers}
          />
        )}
      />
    </Stack.Navigator>
  );
}

function AccountStackScreen({ userData }) {
  return (
    <AccountStack.Navigator screenOptions={{
      ...defaultStackNavigatorOptions,
      headerTitle: "Profile",
    }}>
      <AccountStack.Screen name="Account" children={() => <AccountPage userData={userData} />} />
    </AccountStack.Navigator>
  );
}

function SettingStackScreen() {
  return (
       
    <SettingStack.Navigator screenOptions={{...defaultStackNavigatorOptions, headerTitle:"Settings"}}> 
      <SettingStack.Screen name="My Settings" children={()=> <Settings />} />
    </SettingStack.Navigator>
  )
}

export default function TabNavigation({ userData, users, setRefreshing, refreshing, setPage, page,setUsers }) {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#141414",
          tabBarInactiveTintColor: "#787878",
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: "#fff",
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: "Main",
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require("./assets/hometablogoactive.png")
                    : require("./assets/hometablogoinactive.png")
                }
                style={{
                  width: size,
                  height: size,
                }}
              />
            ),
          }}
          children={() => (
            <HomeStack
              userData={userData}
              users={users}
              setRefreshing={setRefreshing}
              refreshing={refreshing}
              setPage={setPage}
              page={page}
              setUsers={setUsers}
            />
          )}
        />
        <Tab.Screen
          name="My Account"
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require("./assets/accounttablogoactive.png")
                    : require("./assets/accounttablogoinactive.png")
                }
                style={{
                  width: size,
                  height: size,
                }}
              />
            ),
          }}
          children={() => <AccountStackScreen userData={userData} />}
        />
        <Tab.Screen 
          name="Settings"
          children={() => <SettingStackScreen />}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                    ? require("./assets/cog.png")
                    : require("./assets/cog-outline.png")
                }
                style={{
                  width: size,
                  height: size,
                }}
              />
            ),
          }}
        >
          
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
