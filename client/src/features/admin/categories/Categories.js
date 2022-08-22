import React from 'react';
import CategoresList from './CategoriesList';
import Box from '@mui/material/Box';
import CategoryToolbar from '../../../components/CategoryToolbar';

const Categories = () => {
  return (
    <main>
      <Box>
        <CategoryToolbar />
      </Box>
      <Box>
        <CategoresList />
      </Box>
    </main>
  )
}


export default Categories
