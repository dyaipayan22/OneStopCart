import { Link } from 'react-router-dom';
import Rating from './Rating';
import { FaShoppingCart } from 'react-icons/fa';
import Button from './ui/Button';

const ProductCard = (product) => {
  console.log(product);
  return (
    <div className="rounded-xl space-x-4 hover:scale-95 transition-all border-[1.5px]">
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
            <div className="flex w-full justify-between items-center px-4">
              <div className="flex flex-col">
                <span className="font-medium font-Poppins text-lg md:text-xl">
                  {product.name}
                </span>
                <span className="text-base font-Poppins font-normal text-neutral-500">
                  {product.category}
                </span>
              </div>
              <span className="text-lg md:text-xl font-semibold font-Poppins tracking-wide">
                &#8377; {product.price}
              </span>
            </div>

            {/* <div className="flex items-center">
              <Rating value={product.rating} />
              <span className="text-sm md:text-base font-Poppins font-medium">
                &nbsp; ({product.numReviews})
              </span>
            </div> */}
          </div>
          {/* <Button label="Add to Cart" onClick={() => {}} /> */}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
