import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useStore } from "./store"; // vagy ahová a store-t raktad

const HourlyScreen = () => {
  const hourlyData = useStore((state: any) => state.hourlyData);

  if (
    !hourlyData ||
    !hourlyData.time ||
    !hourlyData.temperature_2m ||
    !hourlyData.relative_humidity_2m
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nincs elérhető adathalmaz</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Hourly Weather Data</Text>
      {hourlyData.time.map((t: any, index: number) => (
        <View key={index} style={styles.item}>
          <Text style={styles.text}>
            🕒 {t}
          </Text>
          <Text style={styles.text}>
            🌡️ Temp: {hourlyData.temperature_2m[index]}°C
          </Text>
          <Text style={styles.text}>
            💧 Humidity: {hourlyData.relative_humidity_2m[index]}%
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: "#222",
    flexGrow: 1,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    marginVertical: 2,
  },
  item: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    width: "100%",
  },
});

export default HourlyScreen;
