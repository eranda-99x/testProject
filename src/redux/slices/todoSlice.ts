import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../interfaces/iTodo';

// Todos Slice
export const todosSlice = createSlice({
    name: 'todos',
    initialState: [] as Todo[],
    reducers: {
        // Add Todo
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        // Update Todo
        updateTodo: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        // Delete Todo
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload);
        },
    },
});

//Export Actions
export const { addTodo, updateTodo, deleteTodo  } = todosSlice.actions;

//Export Reducer
export default todosSlice.reducer;
