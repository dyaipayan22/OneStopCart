import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../components/ui/Input';
//import Container from '../components/Container';
import Button from '../components/ui/Button';
import { registerUser } from '../features/user/userSlice';

const Signup = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values) => {
    setIsLoading(true);

    dispatch(registerUser(values));
  };

  return (
    <>
      <div className="w-full md:w-3/5 lg:w-3/6 xl:w-2/5 p-8 mx-auto h-full lg:h-auto md:h-auto border-b-4 bg-neutral-200/100 rounded-md shadow-lg">
        <div className="flex flex-col gap-2 p-3">
          <p className="font-Poppins font-semibold  text-2xl text-center">
            Sign Up
          </p>
          <p className="font-Poppins font-normal text-xl text-center">
            Welcome
          </p>
        </div>
        <div className="flex flex-col gap-2 p-3">
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="email"
            label="Email"
            type="text"
            placeholder="Enter your email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="password"
            label="Password"
            type="text"
            placeholder="Enter your password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <p className="text-right pt-2">Forgot password</p>
        </div>
        <div className="p-3">
          <Button label="Sign In" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </>
  );
};

export default Signup;
