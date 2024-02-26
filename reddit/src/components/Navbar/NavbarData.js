import React from "react";
import { FaCog, FaUser} from "react-icons/fa";
import { Switch } from "@chakra-ui/react";

export const NavbarData = [

    {
        
        
            title: 'Online Status',
            icon: FaCog,
            component: <Switch size="lg" />,
          },
          {
            title: 'Profile',
            icon: FaUser,
            link: '/profile'
          
      },

]