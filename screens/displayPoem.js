import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BigList from "react-native-big-list";

export default function DisplayPoem({ route, navigation }) {

    const {poem} = route.params;

    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text>{poem[0].title}</Text>
                <Text>{poem[0].author}</Text>
                <FlatList
                    data={poem[0].lines}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.index}
                ></FlatList>
            </View>
            <View style={styles.container}>
                <Text>{poem[0].title}</Text>
                <Text>{poem[0].author}</Text>
                <BigList
                    data={poem[0].lines}
                    renderItem={renderItem}
                    itemHeight={25}
                    keyExtractor={(item) => item.index}
                ></BigList>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listItem: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });  