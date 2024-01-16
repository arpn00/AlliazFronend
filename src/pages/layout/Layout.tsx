import React from "react";
import logo from "../../assets/AllianzLogo.png";
import history from "../../assets/History.svg";
import persona from "../../assets/DummyPersona.png";
import { makeStyles, Text } from "@fluentui/react-components";
import { Outlet} from "react-router-dom";
import { Stack, IStackTokens} from '@fluentui/react/lib/Stack';

import { Home28Filled ,History28Regular} from "@fluentui/react-icons";

const useStyles = makeStyles({
    container: {
marginLeft:"auto",
marginRight:"auto",
display:"block",
color:"#233682",
fontWeight:"500",
fontSize:"small",
    },
  });

const Layout = () => {
    const styles = useStyles();

    const verticalGapStackTokens: IStackTokens = {
        childrenGap: 20,
        padding: 10,
    };

    const headingStackTokens: IStackTokens = {
        childrenGap: 45,
        padding: 10,
    };

    const SideBarStyles: React.CSSProperties = {

        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'space-between',
        // height: "100vh",
        zIndex: 1,
        top: 0,
        left: 0,
        overflowX: "hidden",
        overflowY: "hidden",
        borderRight: "1px solid var(--neutrals-web-gray-40-e-1-dfdd, #E1DFDD)",
        backgroundColor: "var(--neutrals-web-gray-20-f-3-f-2-f-1, #F3F2F1)",
        width: 120,
        minHeight:"975px"
    };

    const IconStyles: React.CSSProperties = {
        backgroundColor: "#ffffff",
    };

    const ChildContainerStyles: React.CSSProperties = {
        width: "100%",
        height:"100%"
    };

    return (
        <div id="root" >
            <Stack enableScopedSelectors horizontal>
                <Stack.Item style={SideBarStyles}>
                    <div><Stack enableScopedSelectors tokens={headingStackTokens} >
                        <Stack.Item align="center" >
                            <span><img src={logo} alt="logo" width="80px" />   
                            <Text weight="bold" className={styles.container} align="center">AIM Copilot</Text>                     
                            </span>
                        </Stack.Item>

                        <Stack enableScopedSelectors tokens={verticalGapStackTokens}>
                            <Stack.Item align="center"  >
                                <Home28Filled primaryFill="darkblue" ></Home28Filled>
                            </Stack.Item>
                            <Stack.Item align="center" >
                            <History28Regular></History28Regular>
                            </Stack.Item>
                        </Stack>
                    </Stack></div>
                    <div> <Stack enableScopedSelectors tokens={verticalGapStackTokens}> 
                    <Stack.Item align="center">
                        <span><img src={persona} alt="persona" />
                        </span>
                    </Stack.Item></Stack></div>
                </Stack.Item>
                <Stack.Item style={ChildContainerStyles}>
                    <Outlet />
                </Stack.Item>
            </Stack>
        </div>
    );
};

export default Layout;




