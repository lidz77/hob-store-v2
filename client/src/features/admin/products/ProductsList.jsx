import React from 'react';
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
import Avatar from '@mui/material/Avatar';

const ProductsList = ({
  productsIsLoading,
  filteredProductsList,
  handleSelectItem,
  handleSetProductDetails,
  setEditMode,
  handleDialog,
  handleDeleteProduct
}) => {
  const columns = ['Select', 'Name','Dimension', 'Brand', 'Material', 'Color', 'Price', 'Available', 'Actions'];

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
                          {item.dimension? item.dimension.name : '' }
                        </TableCell>
                        <TableCell>
                          {item.brand ? item.brand.name : ''}
                        </TableCell>
                        <TableCell>
                          {item.material ? item.material.name : ''}
                        </TableCell>
                        <TableCell>
                          <Avatar
                            sx={{
                              bgcolor: item.color,
                              width: 30,
                              height: 30
                            }}
                            > </Avatar>
                        </TableCell>
                        <TableCell>
                          {item.price}
                        </TableCell>
                        <TableCell>
                          {item.available ? 'Available' : 'Out of order'}
                        </TableCell>
                        <TableCell>
                          <ButtonGroup>
                            <Button color="secondary"
                              onClick={() => {
                                handleSetProductDetails(item);
                                setEditMode(true);
                                handleDialog();
                              }}
                              >Edit</Button>
                            <Button
                              onClick={() => handleDeleteProduct(item.id)}
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
  productsIsLoading: PropTypes.bool,
  loadProducts: PropTypes.func,
  filteredProductsList: PropTypes.array,
  handleSelectItem: PropTypes.func,
  handleSetProductDetails: PropTypes.func,
  setEditMode: PropTypes.func,
  handleDialog: PropTypes.func,
  handleDelete: PropTypes.func
}

export default ProductsList
