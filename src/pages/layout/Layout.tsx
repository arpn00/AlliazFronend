import  React ,{useEffect , useState } from "react";
import { FC } from "react";
import logo from "../../assets/AllianzLogo.png";
import { Text } from "@fluentui/react-components";
import { Outlet } from "react-router-dom";
import { Home28Filled, History28Regular } from "@fluentui/react-icons";
import IconButton from "@mui/material/IconButton";
import MenuPersona from "../../components/Persona/MenuPersona.tsx";
import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

interface LayoutProps {

}


const Layout : FC<LayoutProps> = (props) => {

  // get step and lazy load layout.css only if step  >=2
  return (
    <FluentProvider theme={webLightTheme} style={{ height: 'inherit' }}>
    <div id="root">
      <div className="container">
        <div className="NavTog">
          <div className="Icon">
            <img src={logo} alt="logo" width="80px" />
          </div>
          <div className="IconText">
            <Text size={200} weight="bold">
              AIM Copilot
            </Text>
          </div>
          <div className="HomeIcon">
            <IconButton>
              <Home28Filled primaryFill="darkblue"></Home28Filled>
            </IconButton>
          </div>
          <div className="HistoryIcon">
            <IconButton>
              <History28Regular></History28Regular>
            </IconButton>
          </div>
        </div>
        <div className="NavBottom">
          <div className="Persona">
            <MenuPersona></MenuPersona>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
    </FluentProvider>
  );
};

export default Layout;
