import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Input from '../components/ui/Input';
import { useDispatch } from 'react-redux';
import { config } from '../constants/config';

const Checkout = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: '',
      city: '',
      postalCode: '',
      country: '',
      paymentMethod: 'Card',
    },
  });

  const payment = async () => {
    try {
      const { data } = await axios.post('/api/pay/create-checkout-session');
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3">
      <div className="flex flex-col gap-4 col-span-2">
        <div>
          <p className="text-2xl font-Poppins font-semibold">
            Shipping Address
          </p>
          <div className="flex flex-col gap-4">
            <Input
              id="address"
              label="Address"
              type="text"
              placeholder="Enter your address"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <div className="flex  justify-between items-center ">
              <Input
                id="city"
                label="City"
                type="text"
                placeholder="Enter your City"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <Input
                id="postalCode"
                label="Postal Code"
                type="text"
                placeholder="Enter your Postal Code"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <Input
                id="country"
                label="Country"
                type="text"
                placeholder="Enter your Country"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-2xl font-Poppins font-semibold">Payment Method</p>
          <Input
            id="payment"
            type="text"
            placeholder="Enter your Payment Method"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>

      <div className="flex ">
        <p className="text-2xl font-Poppins font-semibold">Order Summary</p>
        <button onClick={payment}>Pay</button>
      </div>
    </div>
  );
};

export default Checkout;
