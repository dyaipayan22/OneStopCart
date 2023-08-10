import { AiTwotoneDelete } from 'react-icons/ai';
const CartProducts = ({ product, quantity, handleRemoveItem }) => {
  return (
    <div className="flex items-center justify-between py-5 border-b-[2px]">
      <div className="flex gap-2 items-center">
        <img src={`/${product.image}`} alt={product.name} className="w-14" />
        <span className="font-Poppins text-base lg:text-lg font-medium">
          {product.name}
          <p className="md:hidden">
            {quantity} x &#8377; {product.price}
          </p>
        </span>
      </div>

      <span className="font-Poppins text-base lg:text-lg font-medium hidden md:block">
        Quantity: {quantity}
      </span>
      <span className="font-Poppins text-base lg:text-lg font-medium hidden md:block">
        &#8377; {product.price}
      </span>

      <AiTwotoneDelete
        className="h-6 w-5 text-neutral-500 cursor-pointer"
        onClick={handleRemoveItem}
      />
    </div>
  );
};

export default CartProducts;
