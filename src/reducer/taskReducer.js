const getInitialTasks = () => {
  try {
    const savedTasks = JSON.parse(localStorage.getItem('task_item'));
    return Array.isArray(savedTasks) ? savedTasks : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  tasks: getInitialTasks(),
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "FILTER_PRODUCTS":
      const filtered = state.tasks.filter((t) =>
        t.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filteredTasks: filtered,
      };
    case 'TOGGLE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, isDone: !task.isDone }
            : task
        ),
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, name: action.payload.task_name, priority: action.payload.priority }
            : task
        )
      };

    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };


    case 'FILTER_TASKS': {
      const filter = action.payload.toLowerCase();
      let filtered = [...state.tasks];

      if (filter === 'completed') {
        filtered = filtered.filter((task) => task.isDone);
      } else if (filter === 'pending') {
        filtered = filtered.filter((task) => !task.isDone);
      } else if (filter === 'low') {
        filtered = filtered.filter((task) => task.priority.toLowerCase() === 'low');
      } else if (filter === 'high') {
        filtered = filtered.filter((task) => task.priority.toLowerCase() === 'high');
      }
      return { ...state, filteredTasks: filtered };
    }

    case 'SORT_TASKS': {
      const sort = action.payload;
      let sorted = [...state.filteredTasks];

      if (sort === 'newest') {
        sorted.sort((a, b) => new Date(b.logtime) - new Date(a.logtime));
      } else if (sort === 'oldest') {
        sorted.sort((a, b) => new Date(a.logtime) - new Date(b.logtime));
      } else if (sort === 'task_name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      }

      return { ...state, filteredTasks: sorted };
    }


    default:
      return state;
  }
};

export default taskReducer;
