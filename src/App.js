import React, { useState } from 'react';
import FunctionCard from './components/FunctionCard';
import { FaDotCircle } from 'react-icons/fa';


const App = () => {
	const [inputValue, setInputValue] = useState(0);
	const [outputValue, setOutputValue] = useState(0);
	const [functions, setFunctions] = useState([
		{ id: 1, equation: 'x ** 2' },
		{ id: 2, equation: '2 * x + 4' },
		{ id: 3, equation: 'x ** 2 + 20' },
		{ id: 4, equation: 'x - 2' },
		{ id: 5, equation: 'x / 2' }
	]);

	const chainOrder = [1, 2, 4, 5, 3];

	const calculateOutput = (value = inputValue, funcs = functions) => {
		try {
			let result = parseFloat(value);

			chainOrder.forEach(id => {
				const func = funcs.find(f => f.id === id);
				if (func) {
					result = eval(func.equation.replace(/x/g, result));
				}
			});
			setOutputValue(result);
		} catch (error) {
			console.error('Invalid equation:', error.message);
			setOutputValue('Error');
		}
	};

	const handleInputChange = value => {
		setInputValue(value);
		calculateOutput(value, functions);
	};

	const handleEquationChange = (id, equation) => {
		const updatedFunctions = functions.map(func =>
			func.id === id ? { ...func, equation } : func
		);
		setFunctions(updatedFunctions);
		calculateOutput(inputValue, updatedFunctions);
	};

	const getNextFunctionId = id => {
		const index = chainOrder.indexOf(id);
		return index !== -1 && index < chainOrder.length - 1
			? chainOrder[index + 1]
			: null;
	};

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col items-center p-10'>
			<h1 className='text-3xl font-bold mb-10'>
				Function Chain Calculator
			</h1>
			<div className='flex gap-10'>
				<div className='flex flex-col self-center gap-4 mb-40'>
					<label className='font-medium bg-[#E29A2D] text-white px-2 rounded-full'>
						Initial value of x
					</label>
					<div className='flex items-center self-center gap-4'>
						<input
							type='number'
							value={inputValue}
							onChange={e => handleInputChange(e.target.value)}
							className='border-2 px-4 py-2 rounded-[8px] border-[#FFC267] h-[33px] w-20'
							placeholder='Enter value'
						/>
						<FaDotCircle color='#DBDBDB' />
					</div>
				</div>

				<div className='grid-container gap-20 relative'>
					{functions.map(func => (
						<div
							className='grid-item'
							key={func.id}
						>
							<FunctionCard
								id={func.id}
								equation={func.equation}
								onEquationChange={handleEquationChange}
								nextFunctionId={getNextFunctionId(func.id)}
							/>
						</div>
					))}
				</div>

				<div className='flex flex-col self-center gap-4 mb-40'>
					<label className='font-medium bg-[#4CAF79] text-white px-2 rounded-full'>
						Final Output y
					</label>
					<div className='flex items-center self-center gap-4'>
						<FaDotCircle color='#DBDBDB' />
						<input
							type='text'
							value={outputValue}
							className='border px-4 py-2 rounded-[8px] w-20 h-[33px] border-[#2DD179]'
							placeholder='Enter value'
							disabled
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
