import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HTML from "react-native-render-html";
import { Audio } from "expo-av";
import { Feather } from "@expo/vector-icons";

const Surat = () => {
  const { suratId } = useLocalSearchParams();
  const [data, setData] = useState([]);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchData();
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://quran-api.santrikoding.com/api/surah/${suratId}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function playOrStopSound(audio) {
    if (isPlaying) {
      stopSound();
    } else {
      playSound(audio);
    }
  }

  async function playSound(audio) {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audio });
      setSound(sound);

      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemAyat}>
      <View
        style={{
          backgroundColor: "#e2e8f0",
          padding: 5,
          alignSelf: "flex-start",
        }}
      >
        <Text>
          {item.surah} : {item.nomor}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginVertical: 16,
        }}
      >
        <Text>{item.ar}</Text>
      </Text>

      <View style={{ marginBottom: 16 }}>
        <HTML
          source={{ html: `<b>${item.tr}</b>` }}
          contentWidth={200}
          baseStyle={{ fontSize: 16, color: "#0e7490" }}
        />
      </View>
      <Text style={{ fontSize: 14 }}>{item.idn}</Text>
    </View>
  );

  // Render the button only if data is available
  const renderButton = () => {
    if (data && data.audio) {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => playOrStopSound(data.audio)}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            {isPlaying ? (
              <Feather name="pause" size={20} color="white" />
            ) : (
              <Feather name="play" size={20} color="white" />
            )}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null; // Render nothing if there is no data or audio
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {renderButton()}
      {data && (
        <FlatList
          data={data.ayat}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Surat;

const styles = StyleSheet.create({
  itemAyat: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f8ff",
    padding: 20,
    borderWidth: 1,
    borderColor: "#dee",
  },
  button: {
    position: "absolute",
    zIndex: 10,
    bottom: 16,
    right: 16,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#0e7490",
    borderRadius: 100,
  },
});
