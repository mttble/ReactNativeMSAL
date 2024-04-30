import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext'; // Adjust the path as necessary

const DrawerMenu = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>DrawerMenu</Text>
      {/* Add a Button to trigger signOut */}
      <Button title="Logout" onPress={() => signOut()} />
    </View>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
