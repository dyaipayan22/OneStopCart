import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import Button from '../components/ui/Button';

import {
  getProductDetails,
  reviewProduct,
} from '../features/product/productSlice';
import { addItemToCart, getCartItems } from '../features/cart/cartSlice';
import { getUserProfile } from '../features/user/userSlice';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Rating from '../components/Rating';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const { productId } = useParams();

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
    <>
      {product && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="mx-auto lg:mx-0">
            <img src={`/${product.image}`} alt={product.name} />
          </div>

          <div className="flex flex-col gap-6 overflow-y-auto">
            <div>
              <p className="text-xl lg:text-2xl font-Poppins font-semibold">
                {product.name}
              </p>
              <p className="text-sm lg:text-base font-Poppins font-semibold text-neutral-500 uppercase">
                {product.category}
              </p>
              <Rating value={product.rating} />
            </div>
            <p className="text-justify font-Poppins text-sm lg:text-base break-normal">
              {product.description}
            </p>
            <div className="flex items-center ">
              <span className="text-xl lg:text-2xl font-Poppins font-semibold">
                &#8377; {product.price} &nbsp;
              </span>
              {/* <span className="text-lg text-neutral-500 font-normal line-through">
                Discounted Price
              </span> */}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:gap-0 lg:grid-cols-2">
              <div className="flex items-center gap-5">
                <span className="text-base lg:text-lg font-Poppins font-normal">
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

            {product?.reviews?.length > 0 && (
              <div>
                <p className="font-Poppins font-semibold text-base lg:text-xl py-4">
                  Reviews
                </p>
                <div className="flex flex-col gap-2">
                  {product?.reviews?.map((review) => (
                    <div key={review.user}>
                      <p className="font-medium text-base lg:text-lg font-Poppins">
                        {review.name}
                      </p>
                      <p className="text-sm lg:text-base font-Poppins px-2">
                        {review.comment}
                      </p>
                      <p className="font-normal text-sm font-Poppins px-2">
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </div>
                  ))}
                  {user ? (
                    <div className="flex flex-col mt-4 gap-2">
                      <span className="font-Poppins font-semibold text-base lg:text-lg">
                        Write a review
                      </span>
                      <input
                        type="text"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />

                      <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button
                        label="Post"
                        onClick={() => {
                          dispatch(
                            reviewProduct({ productId, rating, comment })
                          );
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-center font-Poppins text-base">
                      Sign in <Link to="/login">here</Link> to write a review
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
