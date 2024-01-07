import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Page = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/quran.png")} style={styles.image} />
      </View>

      <Pressable style={styles.button} onPress={() => router.push("/doa")}>
        <FontAwesome5 name="book-open" size={24} color="#0e7490" />
        <Text style={styles.text}>Doa Harian</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push("/jadwal")}>
        <FontAwesome5 name="pray" size={24} color="#0e7490" />
        <Text style={styles.text}>Jadwal Solat</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/daftarsurat")}
      >
        <FontAwesome5 name="quran" size={24} color="#0e7490" />
        <Text style={styles.text}>Daftar Surat</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push("/qiblat")}>
        <FontAwesome5 name="compass" size={24} color="#0e7490" />
        <Text style={styles.text}>Qiblat</Text>
      </Pressable>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(236,254,255,0.5)",
    paddingHorizontal: 40,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  image: {
    width: 144,
    height: 144,
  },
  button: {
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  text: {
    color: "#0e7490",
    fontSize: 20,
    fontWeight: "500",
  },
});
