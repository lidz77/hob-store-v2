import React from 'react';
import PropTypes from 'prop-types';
import {LinearProgress, Box} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';


const ImagesUploader = ({
  handleSelectFiles,
  handleUploadImages,
  previewImages,
  imagesList
}) => {

  return (
    <div className="form-group">
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Input
          type="file"
          inputProps={{
            multiple: true,
            accept: "image/*"
          }}
          onChange={handleSelectFiles}
          />
        <IconButton
          size="large"
          aria-label="Add new category"
          color="inherit"
          onClick={handleUploadImages}
          >
          <UploadIcon />
        </IconButton>
      </Box>

      {previewImages && (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          {previewImages.map((item, index) => {
            return (
                <img
                  className="preview"
                  src={URL.createObjectURL(item)}
                  alt={`image-`+index}
                  key={index}
                  />
            );
          })}
        </Box>
      )}

      {imagesList &&
        imagesList.map((item, index) => {
          return (
            <Box sx={{display: 'flex', alignItems: 'center'}} key={index}>
              <span>{item.name}</span>
              <Box sx={{width: '100%', mr: 1}}>
                <LinearProgress
                  variant="determinate"
                  value={item.percentage}
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
