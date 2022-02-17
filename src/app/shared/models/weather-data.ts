export interface WeatherData {
  alerts: alert[];
  current: {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uvi: number;
    visibility: number;
    weather: weather[];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
  };
  daily: daily[];
  hourly: hourly[];
  lat: number;
  lon: number;
  minutely: minutely[];
  timezone: string;
  timezone_offset: number;
}

export interface alert {
  description: string;
  end: number;
  event: string;
  sender_name: string;
  start: number;
  tags: [];
}

export interface weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface daily {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: { day: number; night: number; eve: string; morn: string };
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  rain: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  uvi: number;
  weather: weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface hourly {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface minutely {
  dt: number;
  precipitation: number;
}
