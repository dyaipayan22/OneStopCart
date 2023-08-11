import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../features/auth/authSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { getUserProfile } from '../features/user/userSlice';

const Signup = () => {
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
    dispatch(login(values)).then(() => {
      dispatch(getUserProfile());
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full md:w-3/5 lg:w-3/6 xl:w-2/5 p-8 mx-auto h-full lg:h-auto md:h-auto border-b-4 rounded-md shadow-lg">
        <span className="font-Poppins font-semibold text-xl lg:text-2xl p-3">
          Sign Up
        </span>

        <div className="flex flex-col gap-4 px-3 py-4">
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="email"
            label="Email"
            type="text"
            placeholder="Enter your Email"
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
        </div>
        <div className="flex flex-col gap-3 p-3">
          <Button label="Sign Up" onClick={handleSubmit(onSubmit)} />
          <div className="flex items-center w-full justify-center">
            <span className="text-base font-Poppins font-medium">
              Already have an account?&nbsp;
            </span>

            <span className="text-base font-Poppins font-medium hover:text-indigo-700">
              <Link to="/login">Sign In</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
