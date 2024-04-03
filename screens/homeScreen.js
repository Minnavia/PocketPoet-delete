import { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Button } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function HomeScreen({ navigation }) {

    const [poems, setPoems] = useState([]);

    const [poem, setPoem] = useState({
        title: '',
        author: '',
        lines: [{
            id: '',
            content: ''
        }],
        linecount: ''
    });

    //make fetch requests, generate random numbers
    const generateRequests = () => {
        const min = 5;
        const max = 15;
        const poemCount = 3;
        const linecounts = [];
        for (let i = 0; i < poemCount; i++) {
            linecounts.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return linecounts.map(linecount => `https://poetrydb.org/random,linecount/1;${linecount}`)
    }

    //fetch poems
    const getData = () => {
        const endpoints = generateRequests();
        const fetchPromises = endpoints.map(endpoint => fetch(endpoint));
        Promise.all(fetchPromises)
        .then(function (responses) {
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        })
        .then(function (data) {
            console.log('OLD DATA: ', data);
            console.log('\nMAPPING OVER THE THING\n')
            newData = [];
            data.map(object => {
                console.log('\nORIGINAL OBJECT\n')
                console.log('\n')
                console.log(object);
                console.log('\n')
                console.log('\nMAKING NEW ARRAY\n')
                console.log('\n')
                var arr = object[0].lines.reduce(function(array, content) {
                    array.push({id: uuidv4(), line: content});
                    return array;
                }, []);
                console.log('\nNEW ARRAY\n')
                console.log(arr);
                console.log('\n')
                newData.push({author: object[0].author, title: object[0].title, linecount: object[0].linecount, lines: arr});
                console.log('NEW OBJECT: ', {...object, lines: arr});
            })
            console.log('NEW DATA: ', newData);
            setPoems([newData]);
            console.log(poems)
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={styles.container}>
            <Text>PocketPoet</Text>
            <FlatList
                data={poems[0]}
                renderItem={({item}) =>
                <View>
                <Text>{item.title}</Text>
                <Text>{item.author}</Text>
                <Button title='Read' onPress={() => navigation.navigate('Poem', {poem: item})}></Button>
                </View>}
                keyExtractor={(item, index) => index.toString()}>
            </FlatList>
            <Button title="Write" onPress={() => navigation.navigate('Write')}></Button>
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