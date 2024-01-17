import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import {
    createTable,
    getMenuItems,
    saveMenuItems,
  } from "../database";
import { useContext, useState, useEffect } from 'react';
import ProfileCircle from '../components/ProfileCircle';
import { AuthContext } from '../App';
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
                    await  createTable();

                    let menuItems = await getMenuItems();

                    if(!menuItems.length) {
                        const menuItems = await fetchData();
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

    const Item = ({ name, price }) => (
        <View >
          <Text>{name}</Text>
          <Text>{price}</Text>
        </View>
      );


    return (
        <View>
            {
            state.user.avatar ?
            <Image source={{uri: state.user.avatar }}  style={{ width: 200, height: 200 }}/> 
            : <ProfileCircle navigation={navigation}/>
            } 
            <View>
                <FlatList data={data} renderItem={({ item }) => (
                    <Item name={item.name} price={item.price} />
                    )}/>
            </View>
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