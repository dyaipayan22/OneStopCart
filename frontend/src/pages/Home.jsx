import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../features/user/userSlice';
import Container from '../components/Container';
import { useEffect } from 'react';
import { getAllProducts } from '../features/product/productSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const productList = useSelector((state) => state.product.products);

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productList &&
          productList.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
      </div>
    </Container>
  );
};

export default HomePage;
