import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

export default function MediaCard({ formik, productType }) {
  const { errors } = useSelector((state) => state.product);

  return (
    <Card
      style={{
        border: Object.keys(formik.errors).length
          ? errors[formik.values.productCode] && '1px solid red'
          : '',
      }}
    >
      <Typography style={{ color: 'red' }}>
        {Object.keys(formik.errors).length
          ? errors[formik.values.productCode]
          : null}
      </Typography>
      <CardContent>
        <CardMedia
          component="img"
          height="140"
          image={'https://picsum.photos/200/300'}
        />
      </CardContent>
    </Card>
  );
}
