/* eslint-disable react/prop-types */
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
   value: OptionProps | null;
   width: number;
   id: string;
   options: Array<OptionProps>;
   handleChange: any;
}

const ComboBox: React.FC<ComboBoxProps> = ({
   handleChange,
   options,
   value,
   title,
   width,
   id,
}) => {
   return (
      <Autocomplete
         value={value}
         onChange={handleChange}
         id={id}
         options={options}
         getOptionLabel={(option) => option.title}
         style={{ width }}
         renderInput={(params) => (
            <TextField
               {...params}
               value={value}
               label={title}
               variant="outlined"
            />
         )}
      />
   );
};

export default ComboBox;
