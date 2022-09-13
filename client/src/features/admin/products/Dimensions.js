import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Remove from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, dimension, theme) {
  return {
    fontWeight:
      dimension.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Dimensions = ({
  loadDimensions,
  dimensionsList,
  deleteDimension,
  addDimension
}) => {
  const theme = useTheme();
  const [dimension, setDimension] = useState('');
  const [newDimension, setNewDimension] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadDimensions());
  }, [dispatch, loadDimensions]);

  const handleDelete = (id) => {
    dispatch(deleteDimension(id));
  }

  const handleChange = (e) => {
    setDimension(e.target.value);
  };

  const handleAdd = () => {
    dispatch(addDimension({
      name: newDimension
    }));
    setNewDimension('');
  }

  return (
    <div>
     <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
       <Select
         displayEmpty
         value={dimension}
         onChange={handleChange}
         input={<OutlinedInput />}
         renderValue={(selected) => {
           if (selected.length === 0) {
             return <em>Select dimension</em>;
           }

           return selected
         }}
         MenuProps={MenuProps}
         inputProps={{ 'aria-label': 'Without label' }}
       >
         <MenuItem disabled value="">
           <em>Select dimension</em>
         </MenuItem>
         {dimensionsList.map((item) => (
           <MenuItem
             key={item.id}
             value={item.name || ''}
             style={getStyles(item.name, dimension, theme)}
           >
             {item.name}
             <Box sx={{display: {xs: 'none', md: 'flex', }}}>
               <IconButton
                 size="large"
                 aria-label="Add new category"
                 color="inherit"
                 onClick={(e)=>{
                   e.preventDefault();
                   handleDelete(item.id);
                 }}
                 >
                 <Remove />
               </IconButton>
             </Box>
           </MenuItem>
         ))}
         <MenuItem
           key='new'
           >
           <TextField
             id="standard-basic"
             label="New dimension"
             variant="standard"
             value={newDimension}
             onChange={(e) => setNewDimension(e.target.value)}
             />
           <Box sx={{display: {xs: 'none', md: 'flex'}}}>
             <IconButton
               size="large"
               aria-label="Add new category"
               color="inherit"
               onClick={()=>handleAdd()}
               >
               <Check />
             </IconButton>
           </Box>
           <Box sx={{display: {xs: 'none', md: 'flex'}}}>
             <IconButton
               size="large"
               aria-label="Add new category"
               color="inherit"
               onClick={()=> setNewDimension('')}
               >
               <Close />
             </IconButton>
           </Box>
         </MenuItem>
       </Select>
     </FormControl>
   </div>
  )
}
Dimensions.propTypes = {
  loadDimensions: PropTypes.func,
  dimensionsList: PropTypes.array,
  deleteDimension: PropTypes.func,
  addDimension: PropTypes.func,
}

export default Dimensions
