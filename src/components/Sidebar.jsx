import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Grid } from '@mui/material';
import { FiLogOut } from 'react-icons/fi';
import { useCookies } from 'react-cookie';
import logo from '../data/ImpressUsLogo.svg';
import avatar from '../data/avatar2.jpg';

import { links } from '../data/nav-links';
import { useStateContext } from '../contexts/ContextProvider';
import { globalConfig } from '../globalConfig';

const Sidebar = () => {
  const { globalRadius, currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg app-color-secondary-4 text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-white m-2';

  const navigate = useNavigate();
  const { domain } = globalConfig;

  const [, setCookie] = useCookies(['t_r', 't_f', 'r_t']);
  const [loggingOut, setLoggingOut] = useState(false);

  const leaveSystem = () => {
    setLoggingOut(true);
    localStorage.removeItem('names');
    setCookie('t_r', '1', { path: '/', sameSite: 'strict', maxAge: 1, domain });
    setCookie('t_f', '1', { path: '/', sameSite: 'strict', maxAge: 1, domain });
    setCookie('r_t', '1', { path: '/', sameSite: 'strict', maxAge: 1, domain });

    setTimeout(() => { navigate('/login'); }, 1500);
  };

  return (
    <div
      className="ml-3 bg-gradient h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10"
      style={{
        height: '98vh',
        borderRadius: globalRadius,
        // background: 'linear-gradient(to top, #6C0F13 0%, #EF3D5B 100%)',
        overflow: 'auto',
      }}
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center" style={{ overflow: 'auto' }}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ width: '100% !important' }}
            >
              <Link
                to="/"
                onClick={handleCloseSideBar}
                className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                style={{ width: '100% !important', paddingTop: '50px' }}
              >
                <img src={logo} alt="logo" style={{ width: '150px' }} />
              </Link>
            </Grid>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-20" style={{ overflow: 'auto' }}>
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.link}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? 'white' : '',
                      marginTop: '30px',
                      borderRadius: globalRadius,
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <span style={{ fontSize: '20px' }}>{link.icon}</span>

                    <span className="capitalize" style={{ fontSize: '20px' }}>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
            <div>
              <div
                onClick={() => leaveSystem()}
                className={normalLink}
                style={{ cursor: 'pointer' }}
              >
                <span style={{ fontSize: '20px' }}><FiLogOut /></span>

                <span className="capitalize" style={{ fontSize: '20px' }}>
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
