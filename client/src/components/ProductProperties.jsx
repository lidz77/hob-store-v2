import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
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

// function getStyles(name, prop, theme) {
//   return {
//     fontWeight:
//       prop.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const ProductProperties = ({
  propsList,
  deleteProp,
  addProp,
  handlePickProp,
  propName,
  propDetails
}) => {
  let [prop, setProp] = useState('');
  let [newProp, setNewProp] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if(propDetails){
      setProp(propDetails.name);
    }
  },[propName])

  const handleDelete = (id) => {
    dispatch(deleteProp(id));
  }

  const handleChange = (e) => {
    console.log(e);
    // handlePickProp(e.target.value.id);
    setProp(e.target.value);
  };

  const handleAdd = () => {
    dispatch(addProp({
      name: newProp
    }));
    setNewProp('');
  }

  return (
    <div>
     <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
       <Select
         displayEmpty
         value={prop || ''}
         onChange={handleChange}
         input={<OutlinedInput />}
         renderValue={(selected) => {
           if (selected.length === 0) {
             return <em>Select {propName}</em>;
           }
           console.log(selected)
           return selected
         }}
         MenuProps={MenuProps}
         inputProps={{ 'aria-label': 'Without label' }}
       >
         <MenuItem disabled value="">
           <em>Select {propName}</em>
         </MenuItem>
         {propsList.map((item) => (
           <MenuItem
             key={item.id+propName}
             value={item.name || ''}
             name={item.id}
             onClick={(e)=>{
               e.preventDefault();
               handlePickProp(item.id);
             }}
           >
             {item.name}
             <Box sx={{display: {xs: 'none', md: 'flex', }}}>
               <IconButton
                 size="large"
                 aria-label={"Add new" + propName}
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
           key={'new'+{propName}}
           >
           <TextField
             id="standard-basic"
             label={"New " + propName}
             variant="standard"
             value={newProp || ""}
             onChange={(e) => setNewProp(e.target.value)}
             />
           <Box sx={{display: {xs: 'none', md: 'flex'}}}>
             <IconButton
               size="large"
               aria-label={"Add new" + propName}
               color="inherit"
               onClick={()=>handleAdd()}
               >
               <Check />
             </IconButton>
           </Box>
           <Box sx={{display: {xs: 'none', md: 'flex'}}}>
             <IconButton
               size="large"
               aria-label={"Add new" + propName}
               color="inherit"
               onClick={()=> setNewProp('')}
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
ProductProperties.propTypes = {
  loadingList: PropTypes.func,
  propsList: PropTypes.array,
  deleteProp: PropTypes.func,
  addProp: PropTypes.func,
  handlePickProp: PropTypes.func,
  propName: PropTypes.string
}

export default ProductProperties
