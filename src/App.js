import React, { useEffect } from 'react';
import './styles.css';
import ProductCard from './components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProduct, validate } from './actions';
import { data, validations } from './data';

export default function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products);

  useEffect(() => {
    processImages();
  }, []);

  const processImages = () => {
    dispatch(uploadProduct(data));
  };

  const onValidate = () => {
    dispatch(validate(validations));
  };

  return (
    <div className="App">
      {(products || []).map((product, index) => (
        <ProductCard product={product} onValidate={onValidate} />
      ))}
    </div>
  );
}
