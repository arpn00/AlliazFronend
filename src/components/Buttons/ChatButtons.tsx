import React from 'react';
import styles from "./ChatButton.module.css";
import { ButtonsType } from "../../api";


interface Props {

    onChatButtonClicked: (buttonKey: string, buttonText: string) => void;
    buttons: ButtonsType[] | undefined;
}

const ChatButtons = ({
    onChatButtonClicked,
    buttons
}: Props) => {
    return (
        <div className={styles.buttonContainer}>
        {buttons && buttons.map((button) => (
            <button
                style={{
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '10px 20px',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '10px',
                    borderRadius: '20px',
                    borderStyle: 'groove',

                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'ivory';
                    e.currentTarget.style.color = 'black';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = 'black';
                }}

                onClick={() => onChatButtonClicked(button.key, button.text)}
            >
                {button.text}
            </button>
        ))}
        </div>
    )
};

export default ChatButtons;
