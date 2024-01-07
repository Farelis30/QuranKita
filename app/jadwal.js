import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { getMonthName } from "../utils/getMonthName";

const jadwal = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [prayTimes, setPrayTimes] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const { latitude, longitude } = location.coords;
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()} ${getMonthName(
        currentDate.getMonth()
      )} ${currentDate.getFullYear()}`;
      setDate(formattedDate);
      const locationResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const locationData = await locationResponse.json();
      setLocation(locationData.address);

      const prayTimesResponse = await fetch(
        `https://api.aladhan.com/v1/timings/${currentDate.getDate()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getFullYear()}?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const prayTimesData = await prayTimesResponse.json();
      setPrayTimes(prayTimesData);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const timings = prayTimes && prayTimes.data.timings;

  const desiredPrayers = ["Imsak", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  const prayerNames = {
    Imsak: "Imsak",
    Fajr: "Subuh",
    Sunrise: "Terbit",
    Dhuhr: "Dzuhur",
    Asr: "Ashar",
    Maghrib: "Maghrib",
    Isha: "Isya",
  };

  const formatTiming = (timing) => {
    if (timing) {
      const match = timing.match(/(\d{2}:\d{2})/);
      return match ? match[0] : timing;
    }
    return "";
  };

  // console.log(timings);
  return (
    <View style={styles.container}>
      {location && (
        <>
          <View>
            <Text style={styles.location}>
              {location.suburb}, {location.city_district} - {location.country}
            </Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <FlatList
            data={desiredPrayers}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View key={item} style={styles.item}>
                <Text style={styles.text}>{prayerNames[item]}</Text>
                <Text style={styles.text}>{formatTiming(timings?.[item])}</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default jadwal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  location: {
    textAlign: "center",
    fontSize: 20,
    color: "#1e293b",
    fontWeight: "500",
    paddingVertical: 10,
  },
  date: {
    textAlign: "center",
    paddingBottom: 10,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f2f8ff",
    marginVertical: 5,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
  },
});
