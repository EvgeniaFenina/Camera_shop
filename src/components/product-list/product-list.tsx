import {Camera} from '../../types/camera';
import ProductCard from '../product-card/product-card';

type ProductListProps = {
  products: Camera[];
}

function ProductList({products}: ProductListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
        />
      ))}
    </div>
  );
}

export default ProductList;
