import { FaHome, FaGamepad, FaBasketballBall, FaInfoCircle, FaAd, FaUsers, FaBook, FaAddressBook, FaChartArea, FaChartLine, FaCoins, FaTv, FaTimes, FaClipboard, FaClipboardList } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Popular',
    icon: FaHome,
    link: '/popular'
  },
  {
    title: 'Topics',
    icon: FaAddressBook,
    iconClosed: IoIosArrowDown,
    iconOpened: IoIosArrowUp,
    subNav: [
      {
        title: 'Gaming',
        icon: FaGamepad,
        link: '/gaming'
      },
      {
        title: 'Sports',
        icon: FaBasketballBall,
        link: '/sports'
      },

      {
        title: 'Business',
        icon: FaChartLine,
        link: '/business'
      },
      {
        title: 'Crypto',
        icon: FaCoins,
        link: '/crypto'
      },
      {
        title: 'Television',
        icon: FaTv,
        link: '/television'
      },
      // ... other topics
    ]
  },
  {
    title: 'Resources',
    icon: FaBook,
    iconClosed: IoIosArrowDown,
    iconOpened: IoIosArrowUp,
    subNav: [
      {
        title: 'About Reddit',
        icon: FaInfoCircle,
        link: '/about'
      },
      {
        title: 'Advertise',
        icon: FaAd,
        link: '/advertise'
      },
      // ... other resources
    ]
  },
  {
    title: 'Communities',
    icon: FaUsers,
    link: '/communities'
  },

  {
    title: 'Best of reddit',
    icon: FaTimes,
    link: '/best'
  },

  {
    title: 'Topics',
    icon: FaClipboardList,
    link: '/topics'
  },


  
  
];

export default SidebarData;
