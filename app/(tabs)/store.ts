import { create } from "zustand";

type HourlyWeatherData = {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  dew_point_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  rain: number[];
  precipitation: number[];
  showers: number[];
  snowfall: number[];
  pressure_msl: number[];
  cloud_cover: number[];
  cloud_cover_high: number[];
  cloud_cover_low: number[];
  cloud_cover_mid: number[];
  visibility: number[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
  wind_gusts_10m: number[];
};

type StoreState = {
  hourlyData: Partial<HourlyWeatherData>;
  setHourlyData: (data: Partial<HourlyWeatherData>) => void;
};

export const useStore = create<StoreState>((set) => ({
  hourlyData: {},
  setHourlyData: (data) => set({ hourlyData: data }),
}));
