import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useStore } from "./store";

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
          <Text style={styles.text}>🕒 Date & Time: {t.replace('T', ' ')}</Text>
          <Text style={styles.text}>
            🌡️ Temp: {hourlyData.temperature_2m[index]} °C
          </Text>
          <Text style={styles.text}>
            💧 Humidity: {hourlyData.relative_humidity_2m[index]} %
          </Text>
          <Text style={styles.text}>
            ❄️ Dew Point {hourlyData.dew_point_2m[index]} °C
          </Text>
          <Text style={styles.text}>
            🌬️ Feels Like {hourlyData.apparent_temperature[index]} °C
          </Text>
          <Text style={styles.text}>
            ☔ Chance of Rain: {hourlyData.precipitation_probability[index]} %
          </Text>
          <Text style={styles.text}>🌧️ Rain: {hourlyData.rain[index]} mm</Text>
          <Text style={styles.text}>
            🌦️ Precipitation: {hourlyData.precipitation[index]} mm
          </Text>
          <Text style={styles.text}>
            🌦️ Showers: {hourlyData.showers[index]} mm
          </Text>
          {((hourlyData.snowfall[index] > 0) || (hourlyData.temperature_2m[index] <= 5)) && <Text style={styles.text}>
            ❄️ Snowfall: {hourlyData.snowfall[index]} mm
          </Text>}
          <Text style={styles.text}>
            🌪️ Pressure: {hourlyData.pressure_msl[index]} hPa
          </Text>
          <Text style={styles.text}>
            ☁️ Cloud Cover: {hourlyData.cloud_cover[index]} %
          </Text>
          <Text style={styles.text}>
            ⛅ High Clouds: {hourlyData.cloud_cover_high[index]} %
          </Text>
          <Text style={styles.text}>
            🌁 Low Clouds: {hourlyData.cloud_cover_low[index]} %
          </Text>
          <Text style={styles.text}>
            🌥️ Mid Clouds: {hourlyData.cloud_cover_mid[index]} %
          </Text>
          <Text style={styles.text}>
            👀 Visibility: {hourlyData.visibility[index]} m
          </Text>
          <Text style={styles.text}>
            💨 Wind Speed: {hourlyData.wind_speed_10m[index]} km/h
          </Text>
          <Text style={styles.text}>
            🧭 Wind Direction {hourlyData.wind_direction_10m[index]} °
          </Text>
          <Text style={styles.text}>
            🌬️ Wind Gusts: {hourlyData.wind_gusts_10m[index]} km/h
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
  counter: {
    color: 'white'
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
