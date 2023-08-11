const OrderProducts = ({ product, quantity }) => {
  return (
    <div className="w-full grid grid-cols-6 border py-2">
      <div className="flex col-span-6 md:col-span-2 items-center gap-4 ml-4 relative">
        <img
          src={`/${product.image}`}
          alt={product.name}
          className="w-32 h-32 object-cover "
        />
        <div className="md:hidden absolute top-0 left-0 px-1 bg-green-700 text-white -rotate-45">
          <span className="text-sm">Paid</span>
        </div>
        <span className="font-Poppins text-lg font-medium">{product.name}</span>
      </div>
      <div className="col-span-6 md:col-span-4 flex items-center justify-between p-4 md:p-0 gap-6 md:gap-0">
        <div className="flex w-1/4 items-center gap-6">
          <span className="font-Poppins md:text-lg font-medium md:mx-auto">
            &#8377; {product.price}
          </span>
        </div>
        <div className="flex w-1/4 items-center gap-6">
          <p className="font-Poppins md:text-lg font-medium md:mx-auto">
            {quantity}
          </p>
        </div>
        <div className="flex w-1/4 items-center gap-6">
          <span className="font-Poppins md:text-lg font-semibold md:mx-auto">
            &#8377; {product.price * quantity}
          </span>
        </div>
        <div className="hidden md:flex w-1/4 items-center gap-6">
          <span className="font-Poppins md:text-lg font-semibold md:mx-auto">
            Paid
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderProducts;
