import React, { useEffect } from 'react';
import { Navbar, Sidebar } from '..';
import '../../App.css';
import { useStateContext } from '../../contexts/ContextProvider';
import { Grid } from '@mui/material';

const Structure = ({ children }) => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    themeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg app-bg-secondary-1">
        {activeMenu ? (
          <div
            className="w-72 fixed h-screen sidebar dark:bg-secondary-dark-bg sidenav-bg"
            style={{ padding: '8px 0px 8px 0px', background: 'none' }}
          >
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
                            activeMenu
                              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full app-bg-secondary-1 '
                              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 app-bg-secondary-1'
                        }
        >
          <div className="fixed md:static app-bg-secondary-1 navbar w-full ">
            <Navbar />
          </div>
          <Grid container className="body">
            {children}
          </Grid>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default Structure;
