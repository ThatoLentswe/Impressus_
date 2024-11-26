import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { RiAccountCircleFill } from 'react-icons/ri';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Grid } from '@mui/material';
import { FaBell } from 'react-icons/fa';
// eslint-disable-next-line import/no-cycle
import { Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
    globalRadius,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative ">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">
        <TooltipComponent content="Profile" position="BottomCenter">
          <Grid
            container
            sx={{
              background: '#EAEBEC',
              height: '70px',
              fontSize: '20px',
              borderRadius: globalRadius,
              marginTop: '3px',
              width: '150px',
              padding: '2px',
            }}
          >
            <Grid
              item
              container
              xs={3.5}
              sx={{ textAlign: 'center', fontSize: '22px' }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              onClick={() => handleClick('notification')}
            >
              <FaBell />
            </Grid>
            <Grid
              item
              container
              xs={5}
              sx={{ textAlign: 'center', fontSize: '35px' }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              onClick={() => handleClick('chat')}
            >
              <span style={{
                borderRadius: globalRadius,
                padding: '12px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              }}
              >
                <RiAccountCircleFill />
              </span>
            </Grid>
            <Grid
              item
              container
              xs={3.5}
              sx={{ textAlign: 'center', fontSize: '22px' }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              onClick={() => handleClick('userProfile')}
            >
              <BsChevronDown />
            </Grid>
          </Grid>
        </TooltipComponent>
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
  );
};

export default Navbar;
