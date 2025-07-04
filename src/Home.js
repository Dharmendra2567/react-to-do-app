import React, { useState } from 'react';
import { filterTasks, handleUpdateTask, removeTask, searchTask, sortTasks, toggleTaskStatus } from './action';
import { useDispatch, useSelector } from 'react-redux';
import AddTaskSection from './AddTaskSection';

const Home = () => {
    const { tasks = [], filteredTasks = [] } = useSelector((state) => state.taskReducer);
    const dispatch = useDispatch();

    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [editTask, setEditTask] = useState(null);
    const [editForm, setEditForm] = useState({ task_name: '', priority: 'low', id: null });
    const handleFilter = (query) => {
        dispatch(searchTask(query));
    };

    const handleDropdownClicked = (id, e) => {
        e.preventDefault();
        setActiveDropdownId(prev => (prev === id ? null : id));
    };

    const handleToggle = (e, id) => {
        dispatch(toggleTaskStatus(id));
    };
    console.log("This is editform: ", editForm)
    const handleUpdateClick = () => {

        console.log("edtifom executed")
        // if (editForm.id && editForm.task_name.trim()) {
        console.log("edtifom executed")
        dispatch(handleUpdateTask(editForm));
        setEditTask(null);
        setEditForm({ task_name: '', priority: 'low', id: null });
        // }
    };
    const handleFilterChange = (e) => {
        dispatch(filterTasks(e.target.value));
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        dispatch(sortTasks(value === "task_name" ? "task_name" : value));
    };

    const displayedTask = filteredTasks.length > 0 ? filteredTasks : tasks;

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center align-items-center'>
                <div className='col-12 col-sm-12 col-md-8 col-lg-6 text-center position-relative' style={{ backgroundColor: 'lightgrey' }}>
                    <h4 className='text-center p-3'>My ToDo</h4>
                    <div className='mx-2 my-4 d-flex justify-content-between align-items-center'>
                        <div className="flex-grow-1 position-relative ">
                            <input type="text" className="custom-input w-100" placeholder="Search task"
                                onChange={(e) => handleFilter(e.target.value)}
                            />
                            <button type="button" className="btn position-absolute end-0 top-50 translate-middle-y me-2 border-0 bg-transparent search-btn">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                        {/* <button className='p-2'><i className='bi bi-filter border-none' /></button> */}
                    </div>
                    <div className='mx-2 my-4 d-flex justify-content-evenly align-items-center'>
                        <div className="filter-control">
                            <label htmlFor="severity-filter">Filter by:</label>
                            <select id="severity-filter" onChange={handleFilterChange}>
                                <option value="All">All</option>
                                <option value="Completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="low">Low Priority</option>
                                <option value="high">High Priority</option>
                            </select>
                        </div>
                        <div className="sort-control">
                            <label htmlFor="sort-order">Sort by:</label>
                            <select id="sort-order" onChange={handleSortChange}>
                                <option value="task_name">Task Name</option>
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    </div>
                    {
                        displayedTask.length > 0 &&
                        <h6 className='text-start'>Today</h6>
                    }
                    {displayedTask == 0 &&
                        <h6 className='text-center'>No Task Added </h6>
                    }

                    {displayedTask.map((task) => (
                        <div key={task.id} className="card border-0 rounded-3 mb-3 p-2 mx-2">
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='d-flex flex-column'>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className="d-flex flex-grow-1">
                                            <input
                                                onChange={(e) => handleToggle(e, task.id)}
                                                className="form-check-input me-2 mt-1 p-2"
                                                type="checkbox"
                                                style={{ border: '1px solid black' }}
                                                checked={task.isDone}
                                            />
                                            <p className="mb-1 text-truncate w-100 text-start">{task.name}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex text-muted small" style={{ fontSize: '12px' }}>
                                        <div className="d-flex align-items-center me-3">
                                            <i className="bi bi-clock me-1"></i>
                                            <span>{task.logtime}</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-info-circle me-1"></i>
                                            <span>{task.priority}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="position-relative">
                                    <button onClick={(e) => handleDropdownClicked(task.id, e)} type='button'>
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                    {activeDropdownId === task.id && (
                                        <div className='custom-dropdown shadow-lg text-start'>
                                            <ul className=''>
                                                <li
                                                    onClick={() => {
                                                        setEditTask(task);
                                                        setEditForm({
                                                            task_name: task.name,
                                                            priority: task.priority,
                                                            id: task.id,
                                                        });
                                                        setActiveDropdownId(null);
                                                    }}>
                                                    Edit
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        dispatch(removeTask(task.id));
                                                        setActiveDropdownId(null);
                                                    }}>
                                                    Remove
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <AddTaskSection />
                </div>
            </div>
            {editTask && (
                <div className="modal-backdrop">
                    <div className="modal-content p-4 rounded shadow" style={{ background: '#fff', maxWidth: '400px', margin: '10% auto' }}>
                        <h5>Edit Task</h5>
                        <input
                            className="form-control mb-2"
                            value={editForm.task_name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, task_name: e.target.value }))}
                            placeholder="Task Name"
                        />
                        <select
                            className="form-select mb-3"
                            value={editForm.priority}
                            onChange={(e) => setEditForm(prev => ({ ...prev, priority: e.target.value }))}
                        >
                            <option value="low">Low</option>
                            <option value="high">High</option>
                        </select>
                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-secondary" onClick={() => setEditTask(null)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleUpdateClick}>Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
