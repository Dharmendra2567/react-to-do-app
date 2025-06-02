import React, { useState } from 'react';
import { addNewTask } from './action';
import { validateInput } from './utils/validation';
import { useSelector, useDispatch } from 'react-redux';

const AddTaskSection = ({ onAdd }) => {
  const dispatch = useDispatch(); // ✅ Add this
  const [showInput, setShowInput] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false)

  const { tasks = [] } = useSelector((state) => state.taskReducer);
  console.log('the following is list of task', tasks);

  const [formData, setFormData] = useState({
    task_name: '',
    priority: 'low',
    logtime: '',
    isDone: false
  });

  const handleAddClick = () => setShowInput(prev => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { task_name } = formData;

    if (validateInput(task_name)) {
      const currentTime = new Date();
      const formattedTime = currentTime.getHours().toString().padStart(2, '0') + ':' +
        currentTime.getMinutes().toString().padStart(2, '0');

      const updatedForm = {
        ...formData,
        logtime: formattedTime
      };

      console.log('first formdata:', formData);
      console.log("formData to dispatch", updatedForm);

      // ✅ Dispatch the thunk here
      dispatch(addNewTask(updatedForm));

      // Reset the form
  
      setShowInput(false);
    } else{
      console.log("invalid input")
    }
  };

  return (
    <div className='p-3 rounded-top-3 position-fixed w-100 custom-bg' style={{ bottom: 0, left: 0, zIndex: 1000 }}>
      {!showInput ? (
        <button className='btn btn-light center-button' onClick={handleAddClick}>+</button>
      ) : (<>
        <form onSubmit={handleSubmit} className='d-flex flex-wrap gap-2 align-items-center justify-content-between'>

            <input
            type='text'
           className={`form-control flex-grow-1 w-50 ${isInvalid ? 'is-invalid' : 'valid'}`}

            placeholder='Task name'
            value={formData.task_name}
            onChange={(e) =>{
             setIsInvalid(! validateInput(e.target.value))
              setFormData(prev => ({
              ...prev,
              task_name: e.target.value
            }))
            } }
            required
            style={{ minWidth: '120px' }}
          />
         
        
          <select
            className='form-select'
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              priority: e.target.value
            }))}
            style={{ width: '110px' }}
          >
            <option value='low'>Low</option>
            <option value='high'>High</option>
          </select>
          <button type='submit' className='btn btn-light'>Add</button>
          <button type='button' className='btn btn-outline-light' onClick={handleAddClick}>✕</button>
        </form>
          {isInvalid && (
  <div className="error-text-input">Please enter a valid task name (at least 2 alphabetic characters).</div>
)}

        </>
      )}
    </div>
  );
};

export default AddTaskSection;
