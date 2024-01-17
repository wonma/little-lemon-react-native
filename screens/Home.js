import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import {
    createTable,
    getMenuItems,
    saveMenuItems,
  } from "../database";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../App';
import MyHeader from '../components/MyHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

function Home({navigation}) {
    const {state, dispatch} = useContext(AuthContext);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        let data = [];
        try {
            const jsonData = await fetch(API_URL);
            data = await jsonData?.json();
        } catch (err) {
            console.log("fetch failed")
        }
        result = await [...data?.menu]
        await console.log(result)
        return result;
    }

    useEffect(()=>{
        //check if there's a table called menuItems
        (
            async() => {
                try {
                    const result = await createTable();

                    let menuItems = await getMenuItems();
                    
                    if(!menuItems.length) {
                        const menuItems = await fetchData();
                        await console.log('from db:', menuItems)
                        await saveMenuItems(menuItems);
                    }

                    if(!menuItems.length) {
                        menuItems = await getMenuItems();
                    }

                    await setData(menuItems)

                } catch(e) {
                    console.log(e)
                }
            }
        )();
    },[])

    const Item = ({ name, price, image }) => (
        <View style={{flex: 1}}>
          <Text>{name}</Text>
          <Text>{price}</Text>
          <Image style={{width: 100, height: 100, resizeMode: 'cover'}}
            source={{uri: image}}
          />
        </View>
      );


    return (
        <View>
            <MyHeader title="Home" showProfileCirCle={true}/>
            <FlatList 
                data={data} 
                renderItem={({ item }) => (
                <Item name={item.name} price={item.price} image={item.image} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    heroContainer: {
        backgroundColor: 'green',
        color: '#fff'
    }
})

export default Home;