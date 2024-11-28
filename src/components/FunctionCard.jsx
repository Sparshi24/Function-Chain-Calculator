import React from 'react';
import { FaDotCircle } from 'react-icons/fa';
import { PiDotsSix } from 'react-icons/pi';

const FunctionCard = ({ id, equation, onEquationChange, nextFunctionId }) => {

  const handleEquationChange = (e) => {
    const updatedEquation = e.target.value.replace(/\^/g, '**');
    onEquationChange(id, updatedEquation);
  };

  return (
    <div className="relative bg-white px-6 pt-4 rounded-lg function-box-shadow border border-gray-50 h-[251px] w-[235px]">
      <div className='flex items-center gap-x-1'>
        <PiDotsSix size={20} />
        <h3 className="text-lg font-semibold">Function {id}</h3>
      </div>

      <label className="block mt-2 text-sm font-medium text-main-text mb-2">Equation:</label>
      <input
        type="text"
        value={equation.replace(/\*\*/g, '^')}
        onChange={handleEquationChange}
        className="w-full border px-4 py-2 rounded-[8px] border-gray-200 h-[33px] mt-1"
      />

      <div className="mt-4 text-sm text-gray-500">
        <label className="block mt-2 text-sm font-medium text-main-text mb-2">Next Function:</label>
        <select disabled className="bg-gray-200 px-2 py-1 rounded-[8px] h-[33px] w-full">
          <option>{nextFunctionId ? `Function: ${nextFunctionId}` : '-'}</option>
        </select>
      </div>

      <div className="absolute left-2 bottom-2 flex items-center gap-x-1 justify-center">
        <FaDotCircle color='#DBDBDB' />
        <span>Input</span>
      </div>

      <div className="absolute right-2 bottom-2 flex items-center gap-x-1 justify-center">
        <span>Output</span>
        <FaDotCircle color='#DBDBDB' />
      </div>
    </div>
  );
};

export default FunctionCard;
