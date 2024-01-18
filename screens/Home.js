import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import Hero from "../components/home/Hero";
  
  const URL =
    "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
  
  const Home = () => {
    const [menu, setMenu] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openSearch, setOpenSearch] = useState(false);
  
    const [activeCategories, setActiveCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [filterMenu, setFilterMenu] = useState([])
  
    const filter = () => {
      const newMenu = menu.filter(item => activeCategories.find(cat => item.category === cat));
      if(search){
        return setFilterMenu(newMenu.filter(item => item.name.includes(search)));
      }
      setFilterMenu(newMenu);
    };
  
    const getData = async () => {
      const data = await (await fetch(URL)).json();
      setMenu(data.menu);
      setFilterMenu(data.menu);
      let cat = [];
      data.menu.forEach(item => {if(!cat.find(c => c === item.category)) cat.push(item.category)})
      setCategories(cat);
      setActiveCategories(cat);
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    useEffect(() => {
      filter();
    }, [search, activeCategories]);
  
    return (
      <View style={styles.container}>
        <Hero>
          <View style={styles.search}>
            <Pressable
              style={styles.searchIcon}
              onPress={() => setOpenSearch((prev) => !prev)}
            >
              <Ionicons name="search-sharp" size={24} color="#495E57" />
            </Pressable>
            {openSearch && (
              <TextInput
                value={search}
                style={styles.input}
                onChangeText={setSearch}
              />
            )}
          </View>
        </Hero>
  
        <Text style={styles.orderTitle}>ORDER FOR DELIVER!</Text>
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
        >
          <View style={{ width: "95%" }}>
            <FlatList
              horizontal={true}
              data={categories}
              contentContainerStyle={{ gap: 15 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.pressable,
                    {
                      backgroundColor:
                        activeCategories.find((cat) => cat === item) && "#495E57",
                    },
                  ]}
                  onPress={() =>
                    setActiveCategories((act) => {
                      if (!act.find((cat) => cat === item)) {
                        act.push(item);
                        return [... act];
                      }
                      return act.filter(cat => cat !== item)
                    })
                  }
                >
                  <Text
                    style={[
                      styles.pressableText,
                      {
                        color:
                          activeCategories.find((cat) => cat === item) &&
                          "#EDEFEE",
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
        <FlatList
          snapToEnd={true}
          data={filterMenu}
          renderItem={({ item }) => <Item item={item} />}
        />
      </View>
    );
  };
  
  export default Home;
  
  const Item = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <Text style={styles.cartText}>{item.name}</Text>
        <Text numberOfLines={2} style={styles.cartText}>
          {item.description}
        </Text>
        <Text style={styles.cartText}>$ {item.price}</Text>
      </View>
      <Image
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
        }}
        width={160}
        height={120}
        style={styles.cardImage}
      />
    </View>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    search: {
      flexDirection: "row",
    },
    searchIcon: {
      padding: 10,
      backgroundColor: "#EDEFEE",
      borderRadius: 50,
      width: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      margin: 10,
    },
    cardBody: {
      width: "50%",
    },
    cardImage: {
      width: 160,
      height: 120,
      borderRadius: 10,
    },
    cartText: {
      fontFamily: "karla-regular",
      color: "#333333",
    },
    pressable: {
      borderColor: "#000",
      borderRadius: 10,
      padding: 10,
      borderWidth: StyleSheet.hairlineWidth,
    },
    pressableText: {
      fontFamily: "karla-regular",
      color: "#333333",
    },
    input: {
      marginHorizontal: 10,
      width: "80%",
      borderRadius: 10,
      borderColor: "#000",
      borderWidth: StyleSheet.hairlineWidth,
      padding: 5,
      fontFamily: "karla-regular",
      fontSize: 16,
      backgroundColor: "#EDEFEE",
    },
    orderTitle: {
      margin: 10,
      fontFamily: "karla-regular",
      color: "#333333",
      fontSize: 20,
    },
  });
  