"use client"
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchCurrentWeather, fetchDailyWeather, fetchWeeklyWeather, fetchMonthlyWeather, fetchYearlyWeather } from './weather-api';
import WeatherLoading from './WeatherLoading';

const WeatherApp = () => {
  const [activeView, setActiveView] = useState('daily');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [viewData, setViewData] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewLoading, setViewLoading] = useState(false);

  // Initial load for current weather and daily data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [current, daily] = await Promise.all([
          fetchCurrentWeather(48.8566, 2.3522),
          fetchDailyWeather(48.8566, 2.3522)
        ]);
        setCurrentWeather(current);
        setViewData({ daily });
      } catch (error) {
        console.error('Failed to load initial weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Handler for view changes
  const handleViewChange = async (view) => {
    if (viewData[view]) {
      setActiveView(view);
      return;
    }

    setViewLoading(true);
    try {
      let data;
      switch (view) {
        case 'weekly':
          data = await fetchWeeklyWeather(48.8566, 2.3522);
          break;
        case 'monthly':
          data = await fetchMonthlyWeather(48.8566, 2.3522);
          break;
        case 'yearly':
          data = await fetchYearlyWeather();
          break;
        default:
          data = await fetchDailyWeather(48.8566, 2.3522);
      }
      setViewData(prev => ({ ...prev, [view]: data }));
      setActiveView(view);
    } catch (error) {
      console.error(`Failed to load ${view} data:`, error);
    } finally {
      setViewLoading(false);
    }
  };

  if (loading || !currentWeather) {
    return <WeatherLoading />;
  }

  const viewConfigs = {
    daily: {
      xKey: 'hour',
      title: 'Température journalière'
    },
    weekly: {
      xKey: 'day',
      title: 'Température hebdomadaire'
    },
    monthly: {
      xKey: 'date',
      title: 'Température mensuelle'
    },
    yearly: {
      xKey: 'month',
      title: 'Température annuelle'
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-12 h-12 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-12 h-12 text-blue-500" />;
      default:
        return <Sun className="w-12 h-12 text-yellow-500" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Carte principale */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{currentWeather.city}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              {getWeatherIcon(currentWeather.condition)}
              <div className="text-4xl font-bold">{currentWeather.temperature}°C</div>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <div className="flex items-center">
                <Wind className="w-6 h-6 mr-2 text-blue-500" />
                <span>{currentWeather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center">
                <Thermometer className="w-6 h-6 mr-2 text-red-500" />
                <span>{currentWeather.humidity}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sélecteur de vue */}
      <div className="flex justify-center space-x-4 mb-6">
        {['daily', 'weekly', 'monthly', 'yearly'].map((view) => (
          <button 
            key={view}
            onClick={() => handleViewChange(view)}
            className={`px-4 py-2 rounded ${activeView === view ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {view === 'daily' ? 'Jour' :
             view === 'weekly' ? 'Semaine' :
             view === 'monthly' ? 'Mois' : 'Année'}
          </button>
        ))}
      </div>

      {/* Graphique */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{viewConfigs[activeView].title}</CardTitle>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            {viewLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Chargement des données...</div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewData[activeView] || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={viewConfigs[activeView].xKey}
                    interval={'preserveStartEnd'}
                  />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip />
                  {activeView !== 'daily' ? (
                    <>
                      <Line 
                        type="monotone" 
                        dataKey="max" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        dot={{ fill: '#ef4444' }}
                        name="Maximum"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="min" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6' }}
                        name="Minimum"
                      />
                    </>
                  ) : (
                    <Line 
                      type="monotone" 
                      dataKey="temp" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={{ fill: '#2563eb' }}
                      name="Température"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Prévisions sur 5 jours */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {(viewData.weekly || []).slice(0, 5).map((day) => (
          <Card key={day.day} className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">{day.day}</CardTitle>
            </CardHeader>
            <CardContent>
              {getWeatherIcon('sunny')}
              <div className="mt-2">
                <span className="font-bold">{day.max}°</span>
                <span className="text-gray-500 mx-1">/</span>
                <span className="text-gray-500">{day.min}°</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
