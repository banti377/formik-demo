import { v4 as uuidV4 } from 'uuid';
import { appConstants } from '../constants';
import { data } from '../data';

export const initialState = {
  products: [],
  errors: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appConstants.UPLOAD_PRODUCT_SUCCESS:
      return action.payload.reduce(
        (
          state,
          {
            productCode,
            productName,
            productCategory,
            imageFile,
            imageFileName,
          }
        ) => {
          const shouldUpdate = state.products.some(
            (product) => product.productCode === productCode
          );

          if (shouldUpdate) {
            return {
              ...state,
              products: state.products.map((product) =>
                product.productCode === productCode
                  ? {
                      ...product,
                      productImages: product.productImages.concat({
                        id: uuidV4(),
                        imageFile,
                        imageFileName,
                      }),
                    }
                  : product
              ),
            };
          }

          return {
            ...state,
            products: state.products.concat({
              productCode,
              productName,
              productCategory,
              productExisting: true,
              productImages: [
                {
                  id: uuidV4(),
                  imageFile,
                  imageFileName,
                },
              ],
            }),
          };
        },
        state
      );

    case appConstants.VALIDATE_SUCCESS:
      let errors = {};
      state.products.forEach((product) => {
        const foundData = data.find(
          (value) => value.productCode === product.productCode
        );
        const productCode = foundData.productCode;
        const fileName = foundData.productImages[0].imageFileName;
        const err = action.payload.validatedData.find(
          (error) => error.id === fileName
        );
        if (err?.validationMessages[0]?.validationMessages)
          errors[productCode] =
            err.validationMessages[0].validationMessages.join(' ');
      });

      return {
        ...state,
        errors,
      };

    default:
      return state;
  }
};

export default appReducer;
