import React from 'react';
import { useParams } from 'react-router-dom';

const ProductInfo: React.FC = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default ProductInfo;
