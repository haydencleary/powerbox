import { writable } from 'svelte/store';

import type { Task } from '$types/task';

export const tasks = writable([] as Task[]);

export const createTask = (newTask: Task) => {
	tasks.update((store) => [...store, { ...newTask, id: Date.now().toString() }]);

	// TODO update local storage
};

export const updateTask = (updatedTask: Task) => {
	tasks.update((store) =>
		store.map((task) => {
			if (task.id === updatedTask.id) {
				return updatedTask;
			}

			return task;
		})
	);

	// TODO update local storage
};

export const deleteTask = (id: string) => {
	tasks.update((store) => store.filter((task) => task.id !== id));

	// TODO update local storage
};
