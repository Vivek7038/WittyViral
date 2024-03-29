import React from "react";
import TextField from "@mui/material/TextField";


function InputsForm({numOfFields, changeForm}) {
    const fieldsArr = Array.from({length: numOfFields}, (_, index) => index + 1);

    return (
        <div>
            {fieldsArr.map(field => (
                <TextField
                    color="secondary"
                    style={{padding: "2%"}}
                    key={field}
                    id={"text-" + field}
                    label={"Enter text #" + field}
                    variant="outlined"
                    fullWidth
                    onInput={changeForm(`boxes[${field-1}][text]`)}
                    required={true}
                />
            ))}
        </div>
    );

}

export default InputsForm;