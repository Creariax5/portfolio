"use client"

export async function fetchCurrentWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
  );

  if (!response.ok) throw new Error('Weather data fetch failed');
  const data = await response.json();
  
  const currentTemp = Math.round(data.current.temperature_2m);
  const currentHumidity = Math.round(data.current.relative_humidity_2m);
  const currentWindSpeed = Math.round(data.current.wind_speed_10m);

  let condition = 'sunny';
  if (currentTemp < 10) condition = 'cloudy';
  if (currentHumidity > 80) condition = 'rainy';

  return {
    city: 'Paris',
    temperature: currentTemp,
    humidity: currentHumidity,
    windSpeed: currentWindSpeed,
    condition
  };
}

export async function fetchDailyWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`
  );

  if (!response.ok) throw new Error('Weather data fetch failed');
  const data = await response.json();

  return data.hourly.time.map((time, index) => ({
    hour: new Date(time).getHours() + 'h',
    temp: Math.round(data.hourly.temperature_2m[index])
  }));
}

export async function fetchWeeklyWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean&timezone=auto`
  );

  if (!response.ok) throw new Error('Weather data fetch failed');
  const data = await response.json();

  return data.daily.time.map((time, index) => ({
    day: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][new Date(time).getDay()],
    temp: Math.round(data.daily.temperature_2m_mean[index]),
    min: Math.round(data.daily.temperature_2m_min[index]),
    max: Math.round(data.daily.temperature_2m_max[index])
  }));
}

export async function fetchMonthlyWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&past_days=30&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean`
  );

  if (!response.ok) throw new Error('Weather data fetch failed');
  const data = await response.json();

  return data.daily.time.map((time, index) => ({
    date: new Date(time).getDate().toString(),
    temp: Math.round(data.daily.temperature_2m_mean[index]),
    min: Math.round(data.daily.temperature_2m_min[index]),
    max: Math.round(data.daily.temperature_2m_max[index])
  }));
}

export async function fetchYearlyWeather() {
  // Since the API doesn't provide yearly data, we'll use static seasonal data
  return [
    { month: 'Jan', base: 5 },
    { month: 'Fév', base: 7 },
    { month: 'Mar', base: 11 },
    { month: 'Avr', base: 14 },
    { month: 'Mai', base: 18 },
    { month: 'Juin', base: 22 },
    { month: 'Juil', base: 25 },
    { month: 'Août', base: 24 },
    { month: 'Sep', base: 20 },
    { month: 'Oct', base: 15 },
    { month: 'Nov', base: 10 },
    { month: 'Déc', base: 6 }
  ].map(month => ({
    month: month.month,
    temp: month.base,
    min: month.base - 5,
    max: month.base + 5
  }));
}
