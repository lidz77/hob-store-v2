import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';

const ProductsList = ({
  productsIsLoading,
  loadProducts,
  filteredProductsList,
  handleSelectItem,
  handleSetDetails,
  setEditMode,
  handleDialog,
  handleDelete
}) => {
  const dispatch = useDispatch();
  const columns = ['Select', 'Name','Dimension', 'Brand', 'Published', 'Color', 'Price', 'Actions'];
  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch, loadProducts])

  return (
    <Box sx={{ flexGrow : 1}}>
      <Paper sx={{width: '100%', overflow: 'hidden'}}>
        {productsIsLoading ? (
          <Backdrop
            sx={{color: '#fff',
              zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            open={true}
            transitionDuration={{
              appear: 5000,
              enter: 5000,
              exit: 5000
            }}
            >
            <CircularProgress color="inherit"/>
          </Backdrop>
        ):(
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
                  {filteredProductsList.map((item, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            onChange={()=>handleSelectItem(item.id)}
                            />
                        </TableCell>
                        <TableCell>
                          {item.title}
                        </TableCell>
                        <TableCell>
                          {item.dimension[0].name }
                        </TableCell>
                        <TableCell>
                          {item.brand}
                        </TableCell>
                        <TableCell>
                          {item.published ? 'Published' : 'Unpublished'}
                        </TableCell>
                        <TableCell>
                          {item.color}
                        </TableCell>
                        <TableCell>
                          {item.price}
                        </TableCell>
                        <TableCell>
                          <ButtonGroup>
                            <Button color="secondary"
                              onClick={() => {
                                handleSetDetails(item);
                                setEditMode(true);
                                handleDialog();
                              }}
                              >Edit</Button>
                            <Button
                              onClick={() => handleDelete(item.id)}
                              variant="outlined" color="error">Delete</Button>
                          </ButtonGroup>
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
ProductsList.propTypes = {

}

export default ProductsList
