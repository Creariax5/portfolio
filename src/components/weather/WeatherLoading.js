import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const WeatherLoading = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-pulse">
      {/* Main Card Loading */}
      <Card className="mb-6">
        <CardHeader>
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="h-12 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Selector Loading */}
      <div className="flex justify-center space-x-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-20 h-10 bg-gray-200 rounded"></div>
        ))}
      </div>

      {/* Chart Loading */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded"></div>
        </CardContent>
      </Card>

      {/* Forecast Cards Loading */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="text-center">
            <CardHeader>
              <div className="h-6 w-16 mx-auto bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full mb-2"></div>
              <div className="h-6 w-24 mx-auto bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeatherLoading;
