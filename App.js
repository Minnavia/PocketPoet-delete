import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, Appbar, BottomNavigation, Text } from 'react-native-paper';
import HomeScreen from './screens/homeScreen';
import DisplayPoem from './screens/displayPoem';
import WritePoem from './screens/writePoem';

const Stack = createNativeStackNavigator();

const Header = ({ scene, previous, navigation }) => {
  const {options} = scene.descriptor;
  const title = options.headerTitle !== undefined
    ? options.headerTitle 
    : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <PaperProvider>
      <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
        {previous ? (
          <Appbar.BackAction
            onPress={navigation.pop}
            color={theme.colors.primary}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.
            }}
        )}
      </Appbar.Header>
    </PaperProvider>
  )
}

export default function App() {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'home', title: 'Home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    //{key: 'display', title: 'Home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    {key: 'write', title: 'Write', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerTitle: 'PocketPoet'}}/>
        <Stack.Screen name='Poem' component={DisplayPoem} options={{headerTitle: 'Poem'}}/>
        <Stack.Screen name='Write' component={WritePoem} options={{headerTitle: 'Write'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
