import React from "react";
import styles from "./UserChatMessage.module.css";

interface Props {
    message: string;
}

export const UserChatMessage = ({ message }: Props) => {
    return (
    <>
        {message !== "" && 
        <div className={styles.container}>
        <div className={styles.message}>{message}</div>
    </div>
    }
    </>

    );
};
