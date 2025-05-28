import axios from "axios";
import React, { useState } from "react";
import {useRouter} from 'expo-router';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

  const [cityVal, setCityVal] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);

  // Current

  const currentUnits = [
  "iso8601",
  "seconds",
  "°C",
  "%",
  '',
  "mm",
  "mm",
  "mm",
  "cm",
  "%",
  "hPa",
  "km/h",
  "°",
  "km/h"
];
  const [current, setCurrent] = useState<CurrentWeather | null>(null);

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

      let latitude = result.latitude;
      let longitude = result.longitude;
      console.log("Latitude: ", latitude);
      console.log("Longitude: ", longitude);

      const url = `https://api.open-meteo.com/v1/forecast?timezone=auto&latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,rain,precipitation,showers,snowfall,pressure_msl,cloud_cover,cloud_cover_high,cloud_cover_low,cloud_cover_mid,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_min,apparent_temperature_max,sunrise,sunset,sunshine_duration,daylight_duration,uv_index_max,uv_index_clear_sky_max,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant`;

      const weatherResponse = await axios.get(url);
      setCurrent(weatherResponse.data.current);
      setWeatherData(weatherResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch weather data");
    }
  };

  const handleCity = () => {
    const trimmedCity = cityVal.trim();
    if (trimmedCity.length === 0) {
      Alert.alert("Alert", "You have to fill this field.", [{ text: "ok" }]);
      return;
    }
    setCity(trimmedCity);
    setCityVal("");
    fetchWeatherData(trimmedCity);
  };

  const goToHourly = () => {
    router.push('/hourly')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main page</Text>
      <TextInput
        style={[styles.text, styles.input]}
        value={cityVal}
        placeholder="Search a city"
        placeholderTextColor="red"
        onChangeText={setCityVal}
      />
      <TouchableOpacity onPress={handleCity}>
        <Text style={styles.text}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToHourly}>
        <Text>Hourly data</Text>
      </TouchableOpacity>
      {city.length > 0 && (
        <Text style={styles.text}>Searched city: {city}</Text>
      )}
      {weatherData && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>
            Current Temperature: {weatherData.current?.temperature_2m ?? "N/A"}
            °C
          </Text>
          {currentUnits &&
            current &&
            Object.entries(current).map(([key, value], index) => (
              <Text key={key}>
                {key} {value} {currentUnits[index]}
              </Text>
            ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
    paddingHorizontal: 20,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  input: {
    width: "100%",
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderColor: "whitesmoke",
    borderRadius: 5,
    borderWidth: 1,
    color: "white",
  },
});
