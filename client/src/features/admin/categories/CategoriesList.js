import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loadCategories, selectCategories, isLoadingCategories} from './categoriesSlice';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';


const CategoresList = () => {
  const dispatch = useDispatch();
  const categoriesIsLoading = useSelector(isLoadingCategories);
  const categoriesList = useSelector(selectCategories);
  const columns = ['id', 'title', 'description', 'published'];


  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch])

  console.log(categoriesList);
  return (
    <Box sx={{ flexGrow : 1}}>
      <Paper sx={{width: '100%', overflow: 'hidden'}}>
        {categoriesIsLoading ? (<h2>Category is loading</h2>):(
          <TableContainer sx={{maxHeight: 400}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((item, index) => {
                    return (
                      <TableCell
                        key={index}
                        >
                        {item}
                      </TableCell>
                    ) })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoriesList.map((item, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell>
                          {item.id}
                        </TableCell>
                        <TableCell>
                          {item.title}
                        </TableCell>
                        <TableCell>
                          {item.description}
                        </TableCell>
                        <TableCell>
                          {item.published ? 'Published' : 'Unpublished'}
                        </TableCell>
                      </TableRow>
                    )}
                  )}
                </TableBody>
              </Table>
            </TableContainer>
        )}
      </Paper>
    </Box>
  )
}


export default CategoresList
