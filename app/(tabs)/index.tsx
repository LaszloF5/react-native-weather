import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useStore } from "./store";

type CurrentWeather = {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  is_day: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  cloud_cover: number;
  pressure_msl: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
};

export default function HomeScreen() {
  const router = useRouter();
  const [cityVal, setCityVal] = useState("");
  const [city, setCity] = useState("");
  const [current, setCurrent] = useState<CurrentWeather | null>(null);

  const setHourlyData = useStore((state: any) => state.setHourlyData);

  const currentUnits = [
    "iso8601",
    "seconds",
    "°C",
    "%",
    "",
    "mm",
    "mm",
    "mm",
    "cm",
    "%",
    "hPa",
    "km/h",
    "°",
    "km/h",
  ];

  const fetchWeatherData = async (currentCity: string) => {
    try {
      const geoResponse = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${currentCity}`
      );

      const result = geoResponse.data?.results?.[0];
      if (!result) {
        Alert.alert("Not found", "City not found");
        return;
      }

      const { latitude, longitude } = result;
      const url = `https://api.open-meteo.com/v1/forecast?timezone=auto&latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,rain,precipitation,showers,snowfall,pressure_msl,cloud_cover,cloud_cover_high,cloud_cover_low,cloud_cover_mid,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m`;

      const weatherResponse = await axios.get(url);

      setCurrent(weatherResponse.data.current);
      setHourlyData(weatherResponse.data.hourly);

      setCity(currentCity);
      setCityVal("");
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch weather data");
    }
  };

  const handleCity = () => {
    const trimmed = cityVal.trim();
    if (!trimmed) {
      Alert.alert("Alert", "You have to fill this field.");
      return;
    }
    fetchWeatherData(trimmed);
  };

  const goToHourly = () => {
    router.push("/hourly");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        value={cityVal}
        placeholder="Search a city"
        placeholderTextColor="#aaa"
        onChangeText={setCityVal}
      />
      <TouchableOpacity onPress={handleCity} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {city.length > 0 && (
        <Text style={styles.text}>Searched city: {city}</Text>
      )}

      {current && (
        <View style={styles.currentData}>
          <Text style={styles.subtitle}>Current Weather:</Text>
          {Object.entries(current).map(([key, value], index) => (
            <Text key={key} style={styles.text}>
              {key}: {value} {currentUnits[index] ?? ""}
            </Text>
          ))}
        </View>
      )}

      <TouchableOpacity onPress={goToHourly} style={styles.button}>
        <Text style={styles.buttonText}>Go to Hourly Forecast</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: "white",
    marginVertical: 2,
  },
  input: {
    backgroundColor: "#333",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#0077ff",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  currentData: {
    marginTop: 20,
  },
});
