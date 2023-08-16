import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../components/Container';
import { getAllProducts } from '../features/product/productSlice';
import AdminProductCard from '../components/AdminProductCard';
import Button from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Container>
      {loading && <span>Loading...</span>}
      {
        <div className="flex flex-col w-full gap-4 relative">
          <span className="text-xl xl:text-4xl font-Poppins font-semibold mb-6">
            Products
          </span>
          <div className="flex items-center md:w-1/6 absolute right-0">
            <Link to="/admin/products/add">
              <Button label="Add Product" />
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            {products?.map((product) => (
              <AdminProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      }
    </Container>
  );
};

export default AdminProducts;
