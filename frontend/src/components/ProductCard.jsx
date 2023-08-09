import { Link } from 'react-router-dom';
import Rating from './Rating';
import { FaShoppingCart } from 'react-icons/fa';
import Button from './ui/Button';

const ProductCard = (product) => {
  console.log(product);
  return (
    <div className="rounded-xl p-3 space-x-4 ">
      <Link to={`/${product.name}/${product._id}`}>
        <div className="aspect-square rounded-xl bg-gray-100 ">
          <img
            src={product.image}
            alt="image"
            className="aspect-square object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col py-4 gap-1">
          <div className="flex flex-col gap-0">
            <div className="flex w-full justify-between items-center">
              <span className="font-medium font-Poppins text-lg md:text-xl">
                {product.name}
              </span>
              <span className="text-lg md:text-xl font-semibold font-Poppins tracking-wide">
                &#8377; {product.price} &nbsp;
              </span>
            </div>
            <span className="text-base font-Poppins font-normal text-neutral-500">
              {product.category}
            </span>
            <div className="flex items-center">
              <Rating value={product.rating} />
              <span className="text-sm md:text-base font-Poppins font-medium">
                &nbsp; ({product.numReviews})
              </span>
            </div>
          </div>

          {/* <div className="flex items-center justify-between pr-4">
            <FaShoppingCart className="w-6 h-5" />
          </div> */}
          <Button label="Add to Cart" onClick={() => {}} />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
