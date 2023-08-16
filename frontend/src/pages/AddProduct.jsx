import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { login } from '../features/auth/authSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { createProduct } from '../features/product/productSlice';
import Sidebar from '../components/Sidebar';
import Container from '../components/Container';

const Login = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'ecommerce');
    setLoading(true);
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/drahtawrd/image/upload',
      data
    );
    const file = await res.data;
    setImageUrl(file.secure_url);
    setLoading(false);
  };

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
    },
  });

  const onSubmit = (values) => {
    const { name, category, description, price, countInStock } = values;
    setIsLoading(true);
    dispatch(
      createProduct({
        name,
        category,
        description,
        image: imageUrl,
        price,
        countInStock,
      })
    );
  };

  return (
    <Container>
      <div className="flex flex-col w-full">
        <span className="text-xl xl:text-4xl font-Poppins font-semibold mb-6">
          Add Product
        </span>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-8 bg-[#F5F5F3] px-8 py-4">
          <div className="grid col-span-1 ">
            <div className="flex flex-col gap-4">
              <span className="text-base lg:text-lg font-Poppins font-medium">
                Enter details about the product
              </span>
              <div className="flex flex-col py-4 gap-6">
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
                <div className="flex gap-4 justify-between w-full">
                  <Input
                    id="countInStock"
                    label="Stock"
                    type="number"
                    placeholder="Enter product Stock"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                  <Input
                    id="price"
                    label="Price"
                    type="number"
                    placeholder="Enter product price"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid col-span-1">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-base lg:text-lg font-Poppins font-medium text-center">
                Upload a picture of the product
              </span>
              <div className="aspect-square rounded-sm bg-white w-72 lg:w-96 mx-auto">
                {imageUrl != '' && (
                  <img
                    src={imageUrl}
                    alt="image"
                    className="aspect-square object-cover rounded-md"
                  />
                )}
              </div>
              <div className="relative inline-block overflow-hidden w-72 lg:w-96 mx-auto">
                <Button label="Upload Image" />
                <input
                  type="file"
                  name="image"
                  onChange={uploadImage}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-base lg:text-lg font-Poppins font-medium">
              Choose appropriate sections
            </span>
            <Button label="Add Product" onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
