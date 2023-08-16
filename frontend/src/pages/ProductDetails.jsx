import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import Button from '../components/ui/Button';

import {
  getProductDetails,
  reviewProduct,
} from '../features/product/productSlice';
import { addItemToCart } from '../features/cart/cartSlice';
import { getUserProfile } from '../features/user/userSlice';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Rating from '../components/Rating';
import Container from '../components/Container';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const { productName, productId } = useParams();

  const user = useSelector((state) => state.user.userInfo);
  const { selectedProduct, successReview } = useSelector(
    (state) => state.product
  );

  const product = selectedProduct;

  useEffect(() => {
    dispatch(getProductDetails(productId));
    dispatch(getUserProfile());
    if (successReview) {
      setComment('');
      setRating('');
    }
  }, [dispatch, productId, successReview]);

  const onAdd = () => {
    if (quantity === product.countInStock) {
      return;
    }
    setQuantity(quantity + 1);
  };

  const onReduce = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    if (user) {
      dispatch(addItemToCart({ userId: user._id, productId, quantity })).then(
        () => {
          navigate(`/cart/${user._id}`);
        }
      );
    } else {
      navigate('/login');
    }
  };

  return (
    <Container>
      <div className="mb-6">
        <span className="font-Poppins text-base font-medium text-lightText">{`Product / ${productName}`}</span>
      </div>
      {product && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  py-5 px-10 bg-[#F5F5F3]">
          <div className="mx-auto lg:mx-0">
            <img src={`${product.image}`} alt={product.name} />
          </div>

          <div className="flex flex-col gap-6 overflow-y-auto ">
            <div>
              <p className="text-xl lg:text-2xl font-Poppins font-semibold">
                {product.name}
              </p>
              <p className="text-sm lg:text-base font-Poppins font-semibold text-neutral-500 uppercase">
                {product.category}
              </p>
              <Rating value={product.rating} />
            </div>
            <p className="text-justify font-Poppins text-sm  break-normal text-lightText">
              {product.description}
            </p>
            <div className="flex items-center ">
              <span className="text-xl lg:text-2xl font-Poppins font-semibold">
                &#8377; {product.price} &nbsp;
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:gap-0 lg:grid-cols-2 ">
              <div className="flex items-center gap-5">
                <span className="text-base font-Poppins font-normal">
                  Select Quantity
                </span>
                <div className="flex items-center gap-3 ">
                  <AiOutlineMinus
                    onClick={onReduce}
                    className="cursor-pointer"
                  />
                  <span className="text-base lg:text-xl font-Poppins font-normal">
                    {quantity}
                  </span>
                  <AiOutlinePlus onClick={onAdd} className="cursor-pointer" />
                </div>
              </div>
              <Button label="Add to Cart" onClick={addToCartHandler} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductDetails;
