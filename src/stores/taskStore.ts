import { browser } from '$app/env';
import { writable } from 'svelte/store';

import type { Task } from '$types/task';

let initialTasks: Task[] = [];

if (browser) {
	const storedTasks = window.localStorage.getItem('tasks');

	if (storedTasks) {
		initialTasks = JSON.parse(storedTasks);
	}
}

export const tasks = writable(initialTasks);

export const createTask = (newTask: Task) => {
	tasks.update((store) => {
		const updated = [...store, { ...newTask, id: Date.now().toString() }];

		if (browser) {
			window.localStorage.setItem('tasks', JSON.stringify(updated));
		}

		return updated;
	});
};

export const updateTask = (updatedTask: Task) => {
	tasks.update((store) => {
		const updated = store.map((task) => {
			if (task.id === updatedTask.id) {
				return updatedTask;
			}

			return task;
		});

		if (browser) {
			window.localStorage.setItem('tasks', JSON.stringify(updated));
		}

		return updated;
	});
};

export const deleteTask = (id: string) => {
	tasks.update((store) => {
		const updated = store.filter((task) => task.id !== id);

		if (browser) {
			window.localStorage.setItem('tasks', JSON.stringify(updated));
		}

		return updated;
	});
};
