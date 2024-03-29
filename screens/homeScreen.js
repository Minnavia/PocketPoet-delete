import { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Button } from "react-native"

export default function HomeScreen({ navigation }) {

    const [poems, setPoems] = useState([]);
    const [number, setNumber] = useState(0);

    const getPoem = () => {
      fetch(`https://poetrydb.org/random,linecount/1;${number}`)
      .then(response => response.json())
      .then(data => setPoems([...poems, data]))
    }

    const generateRandomNumber = () => {
        const min = 5;
        const max = 50;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        setNumber(randomNumber);
    }

    useEffect(() => {
        generateRandomNumber();
        getPoem();
        getPoem();
        getPoem();
    }, []);

    return (
        <View style={styles.container}>
            <Text>PocketPoet</Text>
            <FlatList
                data={poems}
                renderItem={({item}) =>
                <View>
                <Text>{item.title}</Text>
                <Text>{item.author}</Text>
                <Button title='Read' onPress={() => navigation.navigate('Poem', {poem: item})}></Button>
                </View>}
                keyExtractor={(item, index) => index.toString()}>
            </FlatList>
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