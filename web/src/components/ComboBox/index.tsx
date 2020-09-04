/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export interface OptionProps {
   title: string;
   value: string;
}

interface ComboBoxProps {
   title: string;
   width: number;
   id: string;
   options: Array<OptionProps>;
   handleChange: any;
}

const ComboBox: React.FC<ComboBoxProps> = ({
   handleChange,
   options,
   title,
   width,
   id,
}) => {
   return (
      <Autocomplete
         onChange={handleChange}
         id={id}
         options={options}
         getOptionLabel={(option) => option.title}
         style={{ width }}
         renderInput={(params) => (
            <TextField {...params} label={title} variant="outlined" />
         )}
      />
   );
};

export default ComboBox;
