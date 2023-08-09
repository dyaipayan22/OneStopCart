import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { GoogleLogin } from '@react-oauth/google';

import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from './Modal';
import { login } from '../../features/auth/authSlice';

const LoginModal = () => {
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

    dispatch(login(values));
  };

  const bodyContent = (
    <div className="flex flex-col gap-2">
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
      <span className="text-right pt-2">Forgot password</span>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen="true"
      title="Login"
      actionLabel="Continue"
      // onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default LoginModal;
