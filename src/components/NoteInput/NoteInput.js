import React from "react";

import DefaultInput from "../UI/DefaultInput/DefaultInput";

const NoteInput =(props)=> {
  return <DefaultInput
    placeholder="Note"
    value={props.noteData.value}
    valid={props.noteData.valid}
    touched={props.noteData.touched}
    onChangeText={props.onChangeText}
  />};

export default NoteInput;