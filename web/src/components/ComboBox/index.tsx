/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface ComboBoxProps {
   title: string;
   width: number;
}

const ComboBox: React.FC<ComboBoxProps> = ({ title, width }) => {
   return (
      <Autocomplete
         id="combo-box-demo"
         options={top100Films}
         getOptionLabel={(option) => option.title}
         style={{ width }}
         renderInput={(params) => (
            <TextField {...params} label={title} variant="outlined" />
         )}
      />
   );
};

export default ComboBox;
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [{ title: 'The Shawshank Redemption', year: 1994 }];
