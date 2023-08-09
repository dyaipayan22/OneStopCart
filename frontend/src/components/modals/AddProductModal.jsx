import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Input from '../ui/Input';
import Modal from './Modal';

const STEPS = {
  DETAILS: 0,
  IMAGE: 1,
};

const AddProductModal = () => {
  const [step, setStep] = useState(STEPS.DETAILS);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      category: '',
      price: 1,
      countInStock: 1,
      description: '',
      image: '',
    },
  });

  const image = watch('image');

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGE) {
      return 'Add';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.DETAILS) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  const onSubmit = (values) => {
    if (step != STEPS.IMAGE) {
      return onNext();
    }
    setIsLoading(true);
  };

  let bodyContent = (
    <div className="flex flex-col gap-2">
      <Input
        id="name"
        label="Name"
        placeholder="Name"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="category"
        label="Category"
        placeholder="Category"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="price"
        label="Price"
        placeholder="Price"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="stock"
        label="Stock"
        placeholder="Stock"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="description"
        label="Description"
        placeholder="Description"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  if (step === STEPS.IMAGE) {
    bodyContent = <div className="">Images</div>;
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={true}
      title="Add Product"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.DETAILS ? undefined : onBack}
      //onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default AddProductModal;
