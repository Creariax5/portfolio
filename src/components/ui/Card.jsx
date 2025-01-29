import React, { createContext, useContext } from 'react';

// Theme context
const ThemeContext = createContext('light');

export const ThemeProvider = ({ theme = 'light', children }) => (
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
);

const Card = ({ children, className = '', onClick = null, ...props }) => {
  const theme = useContext(ThemeContext);
  const themeClasses = theme === 'dark' 
    ? 'bg-gray-800 border-gray-700 text-white'
    : 'bg-white border-gray-200 text-gray-900';
    
  return (
    <div 
      className={`rounded-lg border transition-colors ${themeClasses} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      } : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => {
  const theme = useContext(ThemeContext);
  const themeClasses = theme === 'dark'
    ? 'border-gray-700'
    : 'border-gray-200';
    
  return (
    <div 
      className={`p-4 border-b transition-colors ${themeClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '', ...props }) => {
  const theme = useContext(ThemeContext);
  const themeClasses = theme === 'dark'
    ? 'text-white'
    : 'text-gray-900';
    
  return (
    <h3 
      className={`text-lg font-semibold transition-colors ${themeClasses} ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardContent = ({ children, className = '', ...props }) => {
  const theme = useContext(ThemeContext);
  const themeClasses = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-600';
    
  return (
    <div 
      className={`p-4 transition-colors ${themeClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent };