import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ProductCard = ({
  productId,
  productName,
  productPrice,
  productBrand,
  productAlt,
  productUrl,
}) => {
  return (
    <Card sx={{ width: 250, height: 250 }} id={`product-id-${productId}`}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          alt={productAlt}
          image={productUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {productName}
          </Typography>
          <Typography>{productPrice}</Typography>
          <Typography>{productBrand}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
ProductCard.propTypes = {};

export default ProductCard;
