
// Action to filter products
export const searchTask = (keyword) => {
  return {
    type: "FILTER_PRODUCTS",
    payload: keyword,
  };
};

//add new task
export const addNewTask = (formData) => async (dispatch, getState) => {
  const { tasks } = getState().taskReducer;
  const { task_name, priority, logtime, isDone } = formData;

  const taskId = tasks.length > 0 ? tasks.length : 0;

  dispatch({
    type: 'ADD_NEW_TASK',
    payload: {
      id: taskId,
      name: task_name,
      priority,
      logtime,
      isDone
    }
  });

  const { tasks: updatedTasks } = getState().taskReducer;
  localStorage.setItem('task_item', JSON.stringify(updatedTasks));
};
//check either task is done or not
export const toggleTaskStatus = (taskId) => (dispatch, getState) => {
  dispatch({
    type: 'TOGGLE_TASK_STATUS',
    payload: taskId
  });

  const { tasks } = getState().taskReducer;
  localStorage.setItem('task_item', JSON.stringify(tasks));
};
//update task
export const handleUpdateTask = (editForm) => async(dispatch,getState)=> {
  dispatch({
    type: 'UPDATE_TASK',
    payload: editForm
  });

  const updatedState =  getState().taskReducer ; 
  localStorage.setItem('task_item', JSON.stringify(updatedState));

};
//remove task from localstorage
export const removeTask = (id) => async (dispatch, getState) => {
  dispatch({
    type: 'REMOVE_TASK',
    payload: id,
  });

  const { tasks } = getState().taskReducer;
  localStorage.setItem('task_item', JSON.stringify(tasks));
};

//filter task by filter type
export const filterTasks = (filterType) => ({
  type: 'FILTER_TASKS',
  payload: filterType,
});

//sort task by sort order
export const sortTasks = (sortOrder) => ({
  type: 'SORT_TASKS',
  payload: sortOrder,
});
