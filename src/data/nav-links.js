import React from 'react';
import { RiDashboardFill } from 'react-icons/ri';
import { FiAlertOctagon } from 'react-icons/fi';
import { TbBrandGoogleAnalytics, TbCurrencyDollar } from 'react-icons/tb';
import { FaRegUser, FaRobot } from 'react-icons/fa';

export const links = [
  {
    links: [
      {
        name: 'dashboard',
        link: '',
        icon: <RiDashboardFill />,
      },
      {
        name: 'analytics',
        link: 'analytics',
        icon: <TbBrandGoogleAnalytics />,
      },
      {
        name: 'accounts',
        link: 'accounts',
        icon: <FaRegUser />,
      },
      {
        name: 'reports & Feedback',
        link: 'reports-and-feedback',
        icon: <FiAlertOctagon />,
      },
      {
        name: 'Content Moderation',
        link: 'content-moderation',
        icon: <FaRobot />,
      },
      {
        name: 'Financials',
        link: 'financials',
        icon: <TbCurrencyDollar />,
      },
    ],
  },

  // {
  //   title: 'Pages',
  //   links: [
  //     {
  //       name: 'orders',
  //       icon: <AiOutlineShoppingCart />,
  //     },
  //     {
  //       name: 'employees',
  //       icon: <IoMdContacts />,
  //     },
  //     {
  //       name: 'customers',
  //       icon: <RiContactsLine />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Apps',
  //   links: [
  //     {
  //       name: 'calendar',
  //       icon: <AiOutlineCalendar />,
  //     },
  //     {
  //       name: 'kanban',
  //       icon: <BsKanban />,
  //     },
  //     {
  //       name: 'editor',
  //       icon: <FiEdit />,
  //     },
  //     {
  //       name: 'color-picker',
  //       icon: <BiColorFill />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Charts',
  //   links: [
  //     {
  //       name: 'line',
  //       icon: <AiOutlineStock />,
  //     },
  //     {
  //       name: 'area',
  //       icon: <AiOutlineAreaChart />,
  //     },
  //
  //     {
  //       name: 'bar',
  //       icon: <AiOutlineBarChart />,
  //     },
  //     {
  //       name: 'pie',
  //       icon: <FiPieChart />,
  //     },
  //     {
  //       name: 'financial',
  //       icon: <RiStockLine />,
  //     },
  //     {
  //       name: 'color-mapping',
  //       icon: <BsBarChart />,
  //     },
  //     {
  //       name: 'pyramid',
  //       icon: <GiLouvrePyramid />,
  //     },
  //     {
  //       name: 'stacked',
  //       icon: <AiOutlineBarChart />,
  //     },
  //   ],
  // },
];
