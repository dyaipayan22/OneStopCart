import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Counter = ({ value, maxValue, onChange }) => {
  const onAdd = useCallback(() => {
    if (value === maxValue) {
      return;
    }
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center">
      <div
        onClick={onReduce}
        className="w-10 h-10  border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
      >
        <AiOutlineMinus />
      </div>
      <div className="font-light text-neutral-600">{value}</div>
      <div
        onClick={onAdd}
        className="w-10 h-10  border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
      >
        <AiOutlinePlus />
      </div>
    </div>
  );
};

export default Counter;
