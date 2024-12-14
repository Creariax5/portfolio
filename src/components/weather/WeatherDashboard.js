"use client"
import React, { useState, useEffect } from 'react';
import { Search, Cloud, Sun, CloudRain, Wind, Thermometer } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for different cities
const citiesData = {
  "New York": {
    city: "New York",
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    hourly: [
      { time: '12 AM', temp: 68 }, { time: '3 AM', temp: 65 },
      { time: '6 AM', temp: 63 }, { time: '9 AM', temp: 70 },
      { time: '12 PM', temp: 75 }, { time: '3 PM', temp: 77 },
      { time: '6 PM', temp: 74 }, { time: '9 PM', temp: 71 }
    ],
    forecast: [
      { day: 'Mon', temp: 72, condition: 'Sunny' },
      { day: 'Tue', temp: 68, condition: 'Cloudy' },
      { day: 'Wed', temp: 75, condition: 'Rain' },
      { day: 'Thu', temp: 70, condition: 'Partly Cloudy' },
      { day: 'Fri', temp: 73, condition: 'Sunny' }
    ]
  },
  "London": {
    city: "London",
    temperature: 62,
    condition: "Rain",
    humidity: 78,
    windSpeed: 12,
    hourly: [
      { time: '12 AM', temp: 60 }, { time: '3 AM', temp: 58 },
      { time: '6 AM', temp: 57 }, { time: '9 AM', temp: 61 },
      { time: '12 PM', temp: 63 }, { time: '3 PM', temp: 64 },
      { time: '6 PM', temp: 62 }, { time: '9 PM', temp: 59 }
    ],
    forecast: [
      { day: 'Mon', temp: 62, condition: 'Rain' },
      { day: 'Tue', temp: 64, condition: 'Cloudy' },
      { day: 'Wed', temp: 63, condition: 'Rain' },
      { day: 'Thu', temp: 65, condition: 'Cloudy' },
      { day: 'Fri', temp: 66, condition: 'Partly Cloudy' }
    ]
  },
  "Tokyo": {
    city: "Tokyo",
    temperature: 75,
    condition: "Sunny",
    humidity: 60,
    windSpeed: 5,
    hourly: [
      { time: '12 AM', temp: 70 }, { time: '3 AM', temp: 68 },
      { time: '6 AM', temp: 69 }, { time: '9 AM', temp: 73 },
      { time: '12 PM', temp: 77 }, { time: '3 PM', temp: 78 },
      { time: '6 PM', temp: 75 }, { time: '9 PM', temp: 72 }
    ],
    forecast: [
      { day: 'Mon', temp: 75, condition: 'Sunny' },
      { day: 'Tue', temp: 77, condition: 'Sunny' },
      { day: 'Wed', temp: 76, condition: 'Partly Cloudy' },
      { day: 'Thu', temp: 78, condition: 'Sunny' },
      { day: 'Fri', temp: 77, condition: 'Sunny' }
    ]
  },
  "Paris": {
    city: "Paris",
    temperature: 68,
    condition: "Cloudy",
    humidity: 70,
    windSpeed: 7,
    hourly: [
      { time: '12 AM', temp: 65 }, { time: '3 AM', temp: 63 },
      { time: '6 AM', temp: 62 }, { time: '9 AM', temp: 66 },
      { time: '12 PM', temp: 69 }, { time: '3 PM', temp: 70 },
      { time: '6 PM', temp: 68 }, { time: '9 PM', temp: 66 }
    ],
    forecast: [
      { day: 'Mon', temp: 68, condition: 'Cloudy' },
      { day: 'Tue', temp: 70, condition: 'Partly Cloudy' },
      { day: 'Wed', temp: 71, condition: 'Sunny' },
      { day: 'Thu', temp: 69, condition: 'Rain' },
      { day: 'Fri', temp: 70, condition: 'Partly Cloudy' }
    ]
  }
};

const WeatherDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(citiesData["New York"]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredCities = Object.keys(citiesData).filter(city =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredCities);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleCitySelect = (city) => {
    setSearchQuery(city);
    setWeather(citiesData[city]);
    setShowSuggestions(false);
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'rain':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Search Bar with Suggestions */}
        <div className="relative">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a city..."
              className="flex-1 p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => setShowSuggestions(false)}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
          
          {/* City Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border">
              {suggestions.map((city) => (
                <div
                  key={city}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Current Weather */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Current Weather in {weather.city}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
              <Thermometer className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-3xl font-bold">{weather.temperature}°F</p>
                <p className="text-gray-500">Temperature</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
              {getWeatherIcon(weather.condition)}
              <div>
                <p className="text-xl font-semibold">{weather.condition}</p>
                <p className="text-gray-500">Condition</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
              <Wind className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-xl font-semibold">{weather.windSpeed} mph</p>
                <p className="text-gray-500">Wind Speed</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
              <CloudRain className="h-8 w-8 text-blue-300" />
              <div>
                <p className="text-xl font-semibold">{weather.humidity}%</p>
                <p className="text-gray-500">Humidity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Graph */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">24-Hour Temperature</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weather.hourly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">5-Day Forecast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {weather.forecast.map((day) => (
              <div key={day.day} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <p className="font-semibold">{day.day}</p>
                {getWeatherIcon(day.condition)}
                <p className="text-lg font-bold mt-2">{day.temp}°F</p>
                <p className="text-sm text-gray-500">{day.condition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
