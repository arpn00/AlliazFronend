import React from "react";
import logo from "../../assets/AllianzLogo.png";
import { Text } from "@fluentui/react-components";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import { Home28Filled, History28Regular } from "@fluentui/react-icons";
import IconButton from "@mui/material/IconButton";
import MenuPersona from "../../components/Persona/MenuPersona.tsx";
import {
  FluentProvider,
  webLightTheme,
  Button
} from "@fluentui/react-components";
const Layout = () => {
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
            {/* <img src={persona} alt="persona" /> */}
          </div>
        </div>
        <Outlet></Outlet>

        {/* <div className="Body">
        </div> */}
      </div>
    </div>
    </FluentProvider>
  );
};

export default Layout;
