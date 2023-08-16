import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { deleteProduct } from '../features/product/productSlice';

const AdminProductCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full grid grid-cols-8 border py-2 gap-1">
      <div className="flex col-span-8 md:col-span-2 items-center gap-4 ml-4 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-14 h-14 object-cover "
        />
        <span className="font-Poppins text-lg font-medium">{product.name}</span>
      </div>
      <div className="col-span-8 md:col-span-6 flex flex-row md:items-center justify-between p-4 md:p-0 gap-2 md:gap-0 mr-4">
        <div className="flex items-center gap-6">
          <span className="font-Poppins md:text-lg font-medium md:mx-auto">
            {product.category}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-Poppins md:text-lg font-medium md:mx-auto">
            {product.countInStock}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-Poppins md:text-lg font-medium md:mx-auto">
            &#8377;{product.price}
          </span>
        </div>
        <div className="md:flex items-center gap-6 hidden ">
          <span className="font-Poppins md:text-lg font-medium md:mx-auto">
            {product.rating}
          </span>
        </div>
        <div className="md:flex items-center gap-6 hidden">
          <span className="font-Poppins md:text-lg font-medium md:mx-auto">
            {product.numReviews}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to={`/admin/product/edit/${product._id}`}>
            <AiOutlineEdit className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
          </Link>
          <AiOutlineDelete
            className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
            onClick={() => {
              dispatch(deleteProduct(product._id));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
