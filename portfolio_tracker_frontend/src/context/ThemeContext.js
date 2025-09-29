import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggle: () => {}
});

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /**
   * Provides theme state across the app.
   * Reads/writes to localStorage for persistence.
   */
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.dataset.theme = theme;
  }, [theme]);

  const value = {
    theme,
    toggle: () => setTheme(t => (t === 'light' ? 'dark' : 'light'))
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// PUBLIC_INTERFACE
export function useTheme() {
  /** Access current theme and toggle handler */
  return useContext(ThemeContext);
}
