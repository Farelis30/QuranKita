import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  LayoutAnimation,
} from "react-native";
import { dataDoa } from "../assets/doaseharihari";
import { Feather, Entypo } from "@expo/vector-icons";

const DoaScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);

  const renderItem = ({ item }) => {
    const isExpanded = expandedItem === item.id;

    const onPressItem = () => {
      LayoutAnimation.configureNext({
        ...LayoutAnimation.Presets.easeInEaseOut,
        duration: 150,
      });
      setExpandedItem(isExpanded ? null : item.id);
    };

    return (
      <TouchableOpacity onPress={onPressItem}>
        <View style={styles.itemDoa}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemDoaTitle}>
              {item.id}. {item.doa}
            </Text>
            <Entypo
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color="#2e2937"
            />
          </View>
          {isExpanded && (
            <View>
              <Text style={styles.ayat}>{item.ayat}</Text>
              <Text style={styles.latin}>{item.latin}</Text>
              <Text style={styles.arti}>{item.artinya}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const filteredDoa = dataDoa.filter(
    (item) =>
      item.doa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artinya.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.doaContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Cari Doa Disini..."
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
          contentContainerStyle={{ marginBottom: 100 }}
          data={filteredDoa}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default DoaScreen;

const styles = StyleSheet.create({
  inputText: {
    flex: 1,
    padding: 16,
    fontSize: 20,
    fontWeight: "500",
  },
  searchIcon: {
    padding: 10,
  },
  doaContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemDoa: {
    flex: 1,
    backgroundColor: "#f2f8ff",
    marginVertical: 5,
    padding: 26,
    borderRadius: 15,
  },
  itemDoaTitle: {
    flex: 1,
    fontWeight: "400",
    color: "#2e2937",
    fontSize: 20,
  },
  ayat: {
    fontSize: 32,
    marginVertical: 18,
    textAlign: "left",
  },
  latin: {
    marginBottom: 16,
    color: "#2460dd",
    fontSize: 18,
  },
  arti: {
    fontSize: 18,
    fontWeight: "400",
    color: "#666",
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
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
