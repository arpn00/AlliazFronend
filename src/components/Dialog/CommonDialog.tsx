import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Slot, makeStyles, shorthands } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import React from 'react';
import { FC, PropsWithChildren } from 'react';

export interface CommonDialogProps {
    maxWidth?: number;
    open: boolean;
    secondaryIcon?: Slot<'span'>;
    secondaryIconPosition?: 'before' | 'after';
    secondaryActionText?: string;
    onSecondaryAction?: () => void;
    hiddenSecondaryButton?: boolean;
    onPrimaryAction?: () => void;
    primaryActionText?: string;
    primaryIcon?: Slot<'span'>;
    primaryIconPosition?: 'before' | 'after';
    disablePrimaryAction?: boolean;
}
const useStyle = makeStyles({
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...shorthands.gap('0.5rem'),
    },
});
export const CommonDialog: FC<PropsWithChildren<CommonDialogProps>> = (props: PropsWithChildren<CommonDialogProps>) => {
    const {
        children,
        open,
        onSecondaryAction,
        secondaryActionText,
        secondaryIcon,
        secondaryIconPosition,
        maxWidth,
        hiddenSecondaryButton,
        onPrimaryAction,
        primaryActionText,
        primaryIcon,
        primaryIconPosition,
        disablePrimaryAction

        } = props;
    const classes = useStyle();
    return (
        <Dialog open={open}>
            <DialogSurface style={{ maxWidth }}>
                <DialogBody>
                    <DialogContent>{children}</DialogContent>
                    <DialogActions>
                        <DialogTrigger action='close'>
                            {secondaryActionText && !hiddenSecondaryButton ? (
                                <Button appearance='secondary' iconPosition={secondaryIconPosition} icon={secondaryIcon} onClick={onSecondaryAction}>
                                    {secondaryActionText}
                                </Button>
                            ) : null}
                        </DialogTrigger>
                        {onPrimaryAction ? (
                            <Button
                                type='button'
                                iconPosition={primaryIconPosition}
                                icon={primaryIcon}
                                disabled={disablePrimaryAction}
                                appearance='primary'
                                onClick={onPrimaryAction}
                            >
                                {primaryActionText}
                            </Button>
                        ) : null}
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
