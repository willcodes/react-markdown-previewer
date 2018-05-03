import React from "react";
import TextField from "material-ui/TextField";

export default ({ title, onChange }) => (
  <TextField
    floatingLabelText="Title"
    type="text"
    value={title}
    onChange={onChange}
  />
);
