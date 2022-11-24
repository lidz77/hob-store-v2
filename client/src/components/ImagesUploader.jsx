import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgressWithLabel from './LinearProgressWithLabel';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '200',
  maxHeight: '200',
  width: 164,
  height: 164,
  fit: 'crop',
  auto: 'format'
})


const ImagesUploader = ({
  handleSelectFiles,
  handleUploadImages,
  previewImages,
  imagesList,
  handleRemoveImage
}) => {

  return (
    <div className="form-group">
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <InputLabel
          htmlFor="product-file"
          >
          {previewImages.length ? previewImages.length +' file is selected'  : 'Choose image(s)'}
        </InputLabel>
        <IconButton
          size="large"
          aria-label="Add new category"
          color="inherit"
          onClick={handleUploadImages}
          sx={{
            float: 'right'
          }}
          >
          Upload
          <UploadIcon />
        </IconButton>
        <Input
          id="product-file"
          type="file"
          inputProps={{
            multiple: true,
            accept: "image/*",
          }}
          sx={{
            visibility: 'hidden'
          }}
          onChange={handleSelectFiles}
          />
      </Box>

      {previewImages && (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Grid
            container
            spacing={2}
            sx={{
              '--Grid-borderWidth': '1px',
              borderTop: 'var(--Grid-borderWidth) solid',
              borderLeft: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',
              '& > div': {
                borderRight: 'var(--Grid-borderWidth) solid',
                borderBottom: 'var(--Grid-borderWidth) solid',
                borderColor: 'divider',
              },
            }}
            >
            <ImageList
              sx={{
                width: 500,
                height: 450
              }}
              cols={3}
              rowHeight={164}
              >
              {previewImages.map((item, index) => {
                return (
                  <Grid
                    key={index}
                    minHeight={160}
                    >
                    <ImageListItem>
                      <ImageListItemBar
                        sx={{
                          background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        }}
                        position="top"
                        actionIcon={
                          <IconButton
                            sx={{color: 'white'}}
                            onClick={()=>handleRemoveImage(index)}
                            >
                            <DeleteIcon/>
                          </IconButton>
                        }
                        >
                      </ImageListItemBar>
                      <Img
                        className="preview"
                        src={URL.createObjectURL(item)}
                        alt={`image-`+index}
                        loading="lazy"
                        />
                    </ImageListItem>
                  </Grid>
                );
              })}
            </ImageList>
          </Grid>
        </Box>
      )}

      {imagesList &&
        imagesList.map((item, index) => {
          return (
            <Box sx={{display: 'flex', alignItems: 'center'}} key={index}>
              <Box sx={{width: '100%', mr: 1}}>
                <LinearProgressWithLabel
                  variant="determinate"
                  value={item.percentage}
                  name={item.name}
                  />
              </Box>
            </Box>
          )
        })
      }
    </div>
  )
}
ImagesUploader.propTypes = {

}

export default ImagesUploader
