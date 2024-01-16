import React from 'react';
import { ThumbLike20Regular, ThumbDislike20Regular,Copy20Regular } from "@fluentui/react-icons";
import { useState } from "react";


const AnswerFeedback: React.FC = () => {

    const [thumbsUpColor, setThumbsUpColor] = useState<string>("");
    const [thumbsDownColor, setThumbsDownColor] = useState<string>("");
    const [copyColor, setcopyColor] = useState<string>("");

    const HandleThumbsUpClick = () => {
        thumbsUpColor === "green" ? setThumbsUpColor("") :
        setThumbsUpColor("green");
        setThumbsDownColor("");
    }
    const HandleThumbsDownClick = () => {
        setThumbsUpColor("");
        thumbsDownColor === "red" ? setThumbsDownColor("") :
        setThumbsDownColor("red");
    }
    const HandleCopyClick = () => {
        copyColor === "blue" ? setcopyColor("") :
        setcopyColor("blue");
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' , fontSize:"smaller" , color:"#707070" }}>
            <span style={{ marginRight: '10px' }}>AI generated content maybe incorrect</span>
            <ThumbLike20Regular primaryFill={thumbsUpColor} filled={true}  onClick={HandleThumbsUpClick} style={{ marginRight: '5px' }} />
            <ThumbDislike20Regular primaryFill={thumbsDownColor} onClick={HandleThumbsDownClick} style={{ marginRight: '5px' }}/>
            <Copy20Regular primaryFill={copyColor} onClick={HandleCopyClick}/>
        </div>
    );
};

export default AnswerFeedback;
