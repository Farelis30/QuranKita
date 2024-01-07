import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const DaftarSurat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://quran-api.santrikoding.com/api/surah"
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleItemPress(item)}>
      <View style={styles.itemSurat}>
        <View style={styles.itemNomorContainer}>
          <Text style={{ color: "#fff" }}>{item.nomor}</Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.nama_latin}
            </Text>
            <Text>
              {item.tempat_turun} | {item.jumlah_ayat} Ayat
            </Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>{item.nama}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const handleItemPress = (item) => {
    router.push({
      pathname: `/surat/${item.id}`,
      params: { nama: item.nama_latin, suratId: item.nomor },
    });
  };

  const filteredSurat = data.filter((item) =>
    item.nama_latin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Cari Surat Disini..."
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Feather
          name="search"
          size={24}
          color="#666"
          style={styles.searchIcon}
        />
      </View>
      <FlatList
        data={filteredSurat}
        keyExtractor={(item) => item.nomor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default DaftarSurat;

const styles = StyleSheet.create({
  itemSurat: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f2f8ff",
    marginVertical: 5,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemNomorContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#0e7490",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 100,
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  inputText: {
    flex: 1,
    padding: 16,
    fontSize: 20,
    fontWeight: "500",
  },
  searchIcon: {
    padding: 10,
  },
});
