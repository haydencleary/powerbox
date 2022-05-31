import { writable } from 'svelte/store';

import type { Task } from '$types/task';

export const tasks = writable([] as Task[]);

export const addTask = (task: Task) => {
	tasks.update((store) => [...store, { id: Date.now().toString(), ...task }]);

	// TODO update local storage
};

export const deleteTask = (id: string) => {
	tasks.update((store) => store.filter((task) => task.id !== id));

	// TODO update local storage
};

// export const deleteTodo = (id) => {
// 	todos.update((todos) => todos.filter((todo) => todo.id !== id));
// };

// export const toggleTodoCompleted = (id) => {
// 	todos.update((todos) => {
// 		let index = -1;
// 		for (let i = 0; i < todos.length; i++) {
// 			if (todos[i].id === id) {
// 				index = i;
// 				break;
// 			}
// 		}
// 		if (index !== -1) {
// 			todos[index].completed = !todos[index].completed;
// 		}
// 		return todos;
// 	});
// };
