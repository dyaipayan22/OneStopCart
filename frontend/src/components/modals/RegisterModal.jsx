import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from './Modal';
import { registerUser } from '../../features/user/userSlice';

const RegisterModal = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    dispatch(registerUser(values));
  };

  const headingContent = (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl font-semibold">Sign Up</span>
      <span>Please enter your details to sign up</span>
    </div>
  );

  const bodyContent = (
    <div className="flex flex-col gap-2">
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
      <div className="w-full flex flex-col items-center pt-2 gap-2">
        <Button label="Sign Up" onClick={handleSubmit(onSubmit)} />
        <span>Already have an account? Sign In</span>
      </div>
    </div>
  );

  return <Modal heading={headingContent} content={bodyContent} />;
};

export default RegisterModal;
