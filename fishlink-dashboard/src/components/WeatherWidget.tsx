// // import { Sun, Wind, Droplets, Sunset } from 'lucide-react';

// // export const WeatherWidget: React.FC = () => {
// //   const weather = {
// //     temp: 28, condition: 'Partly Cloudy',
// //     wind: '15 km/h', humidity: '75%',
// //     sunrise: '6:05 AM', sunset: '6:50 PM',
// //   };

// //   return (
// //     <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <p className="text-lg">Current Weather</p>
// //           <p className="text-4xl font-bold">{weather.temp}°C</p>
// //           <p>{weather.condition}</p>
// //         </div>
// //         <Sun size={64} className="opacity-50" />
// //       </div>
// //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm">
// //         <div className="flex items-center space-x-2"><Wind size={20} /><p>Wind: {weather.wind}</p></div>
// //         <div className="flex items-center space-x-2"><Droplets size={20} /><p>Humidity: {weather.humidity}</p></div>
// //         <div className="flex items-center space-x-2"><Sun size={20} /><p>Sunrise: {weather.sunrise}</p></div>
// //         <div className="flex items-center space-x-2"><Sunset size={20} /><p>Sunset: {weather.sunset}</p></div>
// //       </div>
// //     </div>
// //   );
// // };



// import React from 'react';

// const WeatherWidget = () => {
//   return (
//     <div className="p-4 border rounded shadow">
//       <h2 className="text-lg font-semibold">Weather</h2>
//       <p>Sunny, 29°C</p>
//     </div>
//   );
// };

// export default WeatherWidget;




// src/components/WeatherWidget.tsx
import { Sun, Sunset, Wind, Droplets } from 'lucide-react';

export const WeatherWidget = () => {
    const weather = { temp: 28, condition: 'Partly Cloudy', wind: '15 km/h', humidity: '75%', sunrise: '6:05 AM', sunset: '6:50 PM' };
    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-lg">Current Weather</p>
                    <p className="text-4xl font-bold">{weather.temp}°C</p>
                    <p>{weather.condition}</p>
                </div>
                <Sun size={64} className="opacity-50" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm">
                <div className="flex items-center space-x-2"><Wind size={20} /><p>Wind: {weather.wind}</p></div>
                <div className="flex items-center space-x-2"><Droplets size={20} /><p>Humidity: {weather.humidity}</p></div>
                <div className="flex items-center space-x-2"><Sun size={20} /><p>Sunrise: {weather.sunrise}</p></div>
                <div className="flex items-center space-x-2"><Sunset size={20} /><p>Sunset: {weather.sunset}</p></div>
            </div>
        </div>
    );
};