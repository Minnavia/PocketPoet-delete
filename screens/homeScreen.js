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
        const min = 50;
        const max = 75;
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
        /*[[{"author": "Robert Herrick", "linecount": "6", "lines": [Array], "title": "TO MUSIC: A SONG"}], [{"author": "Sir Walter Raleigh", "linecount": "10", "lines": [Array], "title": "Life"}], [{"author": "Robert Herrick", "linecount": "8", "lines": [Array], "title": "THE SUCCESSION OF THE FOUR SWEET MONTHS"}]]*/
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
        /*.then(function (data) {
            var arr = data.map(item => item[0].lines.map(line => {
                return (line)
            }));
            console.log('ORIGINAL ', arr);
            var res = arr[0].reduce(function(array, content) {
                array.push({id: uuidv4(), line: content});
                return array;
            }, []);
            console.log('NEW', res);
            data.map(item => setPoem({...poem, title: item[0].title, author: item[0].author, linecount: item[0].linecount, lines: res}));
            console.log(poem);
            console.log('ALL POEMS: ', poems);
        })*/
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