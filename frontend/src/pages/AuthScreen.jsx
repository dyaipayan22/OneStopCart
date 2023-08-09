import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/ui/Input';

const AuthScreen = () => {
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

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        id="email"
        label="Email"
        type="text"
        placeholder="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <button onClick={handleSubmit(onSubmit)}>Submit</button>
    </div>
  );
};

export default AuthScreen;
