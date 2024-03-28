import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Slot, makeStyles, shorthands } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import React from 'react';
import { FC, PropsWithChildren } from 'react';

export interface CommonDialogProps {
    title: string;
    icon?: () => JSX.Element;
    maxWidth?: number;
    open: boolean;
    primaryActionText?: string;
    primaryIcon?: Slot<'span'>;
    primaryIconPosition?: 'before' | 'after';
    secondaryIcon?: Slot<'span'>;
    secondaryIconPosition?: 'before' | 'after';
    secondaryActionText?: string;
    containsForm?: boolean;
    disablePrimaryAction?: boolean;
    onSecondaryAction?: () => void;
    onPrimaryAction?: () => void;
    hiddenSecondaryButton?: boolean;
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
        icon,
        children,
        containsForm = false,
        primaryIconPosition,
        open,
        title,
        onPrimaryAction,
        onSecondaryAction,
        disablePrimaryAction,
        primaryActionText,
        secondaryActionText,
        primaryIcon,
        secondaryIcon,
        secondaryIconPosition,
        maxWidth,
        hiddenSecondaryButton,
    } = props;
    const classes = useStyle();
    return (
        <Dialog open={open}>
            <DialogSurface style={{ maxWidth }}>
                <DialogBody>
                    <DialogTitle
                        action={
                            onSecondaryAction ? (
                                <DialogTrigger action='close'>
                                    <Button appearance='subtle' aria-label='close' icon={<Dismiss24Regular />} onClick={onSecondaryAction} />
                                </DialogTrigger>
                            ) : null
                        }
                    >
                        <div className={classes.title}>
                            {icon ? icon() : null}
                            {title}
                        </div>
                    </DialogTitle>
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
                                type={containsForm ? 'submit' : 'button'}
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
