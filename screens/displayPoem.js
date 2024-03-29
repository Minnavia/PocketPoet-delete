import { FlatList, StyleSheet, Text, View } from "react-native";

export default function DisplayPoem({ route, navigation }) {

    const {poem} = route.params;

    return (
        <View>
            <Text>{poem.title}</Text>
            <Text>{poem.author}</Text>
            <FlatList
                data={poem.lines}
                renderItem={({item}) => 
                <View style={styles.listitem}>
                  <Text>{item}</Text>
                </View>
                }
            ></FlatList>
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
  });  