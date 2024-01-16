import { BotAdd20Filled } from "@fluentui/react-icons";
import React from "react";
import { makeStyles, Text } from "@fluentui/react-components";

const useStyles = makeStyles({
    container: {
        color: "mediumslateblue",
        fontFamily: "Encode Sans",
        fontSize: "15px",
        fontWeight: "500",
        marginLeft: "2px",
    },
  });

export const AnswerIcon = () => {
    const styles = useStyles();
    return <span><BotAdd20Filled primaryFill={"rgba(115, 118, 225, 1)"} aria-hidden="true" aria-label="Bot logo" /><Text weight="bold" className={styles.container}>Copilot</Text></span>;
};
