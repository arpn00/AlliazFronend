import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import React from "react";
import { useState } from 'react';
import Chat from "../../pages/chat/Chat.tsx";



const IdentAnalysis = () => {

  const [externalIdent, setexternalIdent] = useState<string>("");
  const [externalIdentType, setexternalIdentType] = useState<string | undefined>("");
  const [evalCode, setevalCode] = useState<string | undefined>("");
  const [mdValue, setmdValue] = useState<string | undefined>("");
  const [startChat, setStartChat] = useState<boolean>(false);


  const HandleExternalIdentChange = (event) => {    
    setexternalIdent(event.target.value);

  };

  const HandleexternalIdentTypeChange =   (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {       
setexternalIdentType(option?.text)
}   

  const HandleMdValueChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {    

    setevalCode(option?.text);

  };

  const HandleEvalCodeChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {  

    setmdValue(option?.text);

  };

  const HandleSubmit = () => {

    setStartChat(true);

  };
  const HeaderStyles: React.CSSProperties = {
    color: "#605E5C", fontSize: "42px"
  };

  const ControlStyles: React.CSSProperties = {
    width: "250px",
  };

  const identTypesOptions: IDropdownOption[] = [
    { key: 'isin', text: 'ISIN' }
  ];

  const evalCodesOptions: IDropdownOption[] = [
    { key: 'rtgsensitive', text: 'IS_RTG_SENSITIVE' }
  ];

  const mdvalueOptions: IDropdownOption[] = [
    { key: 'y', text: 'Y' }
  ];

  return (
<div>{startChat ? (<Chat externalIdent={externalIdent} externalIdentType= {externalIdentType} evalCode= {evalCode} mdValue= {mdValue}></Chat>)
 : (
  <Stack enableScopedSelectors  >
        <Stack.Item align="center" style={{ paddingTop: "10%", paddingBottom: "8%" }}>
          <Text block style={HeaderStyles} variant="xxLarge" nowrap >Start your SPPI Analysis</Text>
        </Stack.Item>
        <Stack style={{ borderStyle: "solid", marginLeft: "200px", marginRight: "200px", borderColor: "#EDEDED" }}>
          <Stack.Item align="center" tokens={{ padding: 20 }}>
            <Text variant="xLarge" nowrap >External Ident</Text>
          </Stack.Item>
          <Stack.Item align="center" tokens={{ padding: 20 }}>
            <TextField style={ControlStyles}
              placeholder="Enter External Ident"
              onChange={HandleExternalIdentChange} />
          </Stack.Item>
          <Stack.Item align="center" tokens={{ padding: 20 }}>
            <Dropdown
              placeholder="Select Types of External Ident"
              options={identTypesOptions}
              style={ControlStyles}
              onChange={HandleexternalIdentTypeChange}
            />
          </Stack.Item>
          <Stack.Item align="center" tokens={{ padding: 20 }}>
            <Dropdown
              placeholder="Enter Eval Code"
              options={evalCodesOptions}
              style={ControlStyles}
              onChange={HandleEvalCodeChange}
            />
          </Stack.Item>
          <Stack.Item align="center" tokens={{ padding: 20 }}>
            <Dropdown
              placeholder="Enter MD Value"
              options={mdvalueOptions}
              style={ControlStyles}
              onChange={HandleMdValueChange}
            />
          </Stack.Item>
          <Stack.Item align="center" tokens={{ padding: 20 }}>
            <PrimaryButton text="Continue" allowDisabledFocus checked={true} disabled = {externalIdent == "" || externalIdentType == "" || mdValue == "" || evalCode == ""}  onClick={HandleSubmit}/>
          </Stack.Item>
        </Stack>
      </Stack>
 ) }</div> 
      );
}

export default IdentAnalysis;
