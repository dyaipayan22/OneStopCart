import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../features/auth/authSlice';
import Input from '../components/ui/Input';
//import Container from '../components/Container';
import Button from '../components/ui/Button';
import { createProduct } from '../features/product/productSlice';
import Sidebar from '../components/Sidebar';

const Login = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      category: '',
      description: '',
      countInStock: 1,
      price: 0,
      image: 'image.jpg',
    },
  });

  const onSubmit = (values) => {
    setIsLoading(true);

    dispatch(createProduct(values));
  };

  return (
    <>
      <div className="grid grid-rows-2 grid-cols-3 w-full mx-auto">
        <div className="flex items-center justify-between">
          <span>Product</span>
          <span>Orders</span>
          <span>Users</span>
        </div>
      </div>
    </>
  );
  /* <div className="grid grid-cols-3 ">
          <div className="col-span-2">
            <div className="flex flex-col gap-4 px-3 py-4">
              <div className="flex items-center gap-2 w-full">
                <Input
                  id="name"
                  label="Name"
                  type="text"
                  placeholder="Product Name"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  id="category"
                  label="Category"
                  type="text"
                  placeholder="Product Category"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              <Input
                id="description"
                label="Description"
                type="text"
                placeholder="Product Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>
          </div>
          <div className="col-span-1">
            <span>Picture</span>
          </div>
        </div>
      </div> */
  /* <div className="w-full md:w-3/5 lg:w-3/6 xl:w-2/5 p-8 mx-auto h-full lg:h-auto md:h-auto border-b-4 bg-neutral-200/100 rounded-md shadow-lg">
        <div className="flex flex-col gap-2 p-3">
          <p className="font-Poppins font-semibold  text-2xl text-center">
            Add Product
          </p>
          <p className="font-Poppins font-normal text-xl text-center">
            Enter Product Details
          </p>
        </div>
        <div className="flex flex-col gap-2 p-3">
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Enter Product Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="category"
            label="category"
            type="text"
            placeholder="Enter product category"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="description"
            label="description"
            type="text"
            placeholder="Enter product description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="countInStock"
            label="Stock"
            type="text"
            placeholder="Enter product Stock"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="price"
            label="price"
            type="text"
            placeholder="Enter product price"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className="p-3">
          <Button label="Add" onClick={handleSubmit(onSubmit)} />
        </div>
      </div> */
};

export default Login;
