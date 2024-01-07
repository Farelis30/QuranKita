import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        headerTintColor: "#0e7490",
        headerTitleStyle: {
          fontWeight: "500",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "QuranKita" }} />
      <Stack.Screen name="doa" options={{ headerTitle: "Doa Harian" }} />
      <Stack.Screen name="jadwal" options={{ headerTitle: "Jadwal Solat" }} />
      <Stack.Screen
        name="qiblat"
        options={{
          headerTitle: "Qiblat",
          headerStyle: {
            backgroundColor: "rgb(40,100,120)",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="daftarsurat"
        options={{ headerTitle: "Daftar Surat" }}
      />
      <Stack.Screen
        name="surat/[suratId]"
        options={({ route }) => ({ headerTitle: route.params.nama })}
      />
    </Stack>
  );
};

export default Layout;
