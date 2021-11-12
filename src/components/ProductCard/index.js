import React, { useEffect } from 'react';
import MediaCard from '../MediaCard';
import { Box, Grid, Button } from '@material-ui/core';
import { useFormik, FormikProvider } from 'formik';
import ProductInputs from '../ProductInputs';
import { productSchema } from '../../schema';

export default function ProductCard(props) {
  const { product, categories, onValidate } = props;

  const formik = useFormik({
    initialValues: {
      productCode: product.productCode || '',
      productName: product.productName || '',
      productCategory: product.productCategory || null,
      productExisting: product.productExisting,
      productImages: product.productImages || [],
    },
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    formik.handleSubmit();
    onValidate();
  }, []);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <ProductInputs formik={formik} categories={categories} />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                type="submit"
              >
                Create
              </Button>
            </Grid>
          </Grid>

          <Grid component="div" container spacing={2}>
            <Grid component="div" item xl={10} lg={10} md={12} sm={12} xs={12}>
              <Grid component="div" container spacing={2}>
                {formik.values.productImages.map((data, index) => (
                  <Grid
                    key={data.id}
                    component="div"
                    item
                    xl={2}
                    lg={2}
                    md={2}
                    sm={12}
                    xs={12}
                  >
                    <MediaCard formik={formik} productType={data} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormikProvider>
  );
}
