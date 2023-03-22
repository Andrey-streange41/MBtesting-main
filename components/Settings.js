import React from 'react';
import { View, Text, TouchableOpacity,Button,StyleSheet } from 'react-native';

const Settings = ({ navigation }) => {
    const handlePress = () => {
        alert("Button pressed!");
      };
    
      const handleEdit = () => {
        alert("Edit button pressed!");
      };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to the Settings Screen</Text>
       <View>
          <Button title="Press me" onPress={handlePress} />
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editText}>Edit Account</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
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
})
