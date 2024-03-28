import { Menu, MenuDivider, MenuItem, MenuList, MenuPopover, MenuTrigger, Persona, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import {   SignOut24Regular } from '@fluentui/react-icons';
import React from 'react';
import { FC } from 'react';


// import persona from "../../assets/DummyPersona.png";

interface MenuPersonaProps {
    name?: string;
    photo?: string | undefined;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        bottom: tokens.spacingHorizontalXXL,
        cursor: 'pointer',
        alignItems: 'flex-end',
        ...shorthands.flex(1),
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
            ...shorthands.borderRadius(tokens.borderRadiusMedium),
        },
        backgroundColor:'#F3F2F1'
    },
});

const MenuPersona: FC<MenuPersonaProps> = (props) => {
    const { name, photo, } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Menu>
                <MenuTrigger disableButtonEnhancement>
                    <Persona
                     textPosition="below"
                        textAlignment='center'
                        size='extra-large'
                        name="Arun Menon"
                        avatar={{
                            image: {
                                src: "",
                            },
                        }}
                    />
                </MenuTrigger>

                <MenuPopover>
                    <MenuList>
                        <MenuItem icon={<SignOut24Regular />}>
                            Log Out
                        </MenuItem>
                    </MenuList>
                </MenuPopover>
            </Menu>
        </div>

    );
};

export default MenuPersona;
