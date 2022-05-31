<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Field from '$components/Field.svelte';

	import EditIcon from '$icons/Edit.svelte';
	import DeleteIcon from '$icons/Delete.svelte';

	import { updateTask } from '$stores/taskStore';

	import type { Task } from '$types/task';

	export let task: Task;

	$: ({ id, title, description, status, urgency, impact } = task);

	const STATUS_TODO = 'todo';
	const STATUS_DONE = 'done';

	$: taskDone = status === STATUS_DONE;

	const dispatch = createEventDispatcher();

	function handleStatusChange(e: Event) {
		const target = e.target as HTMLInputElement;

		if (target.checked) {
			status = STATUS_DONE;
		} else {
			status = STATUS_TODO;
		}

		updateTask({ ...task, status });
	}
</script>

<article
	class="relative hover:bg-blue-50 hover:bg-opacity-50 flex p-6 border-b border-slate-200 group overflow-hidden"
>
	<div>
		<input type="checkbox" class="rounded" checked={taskDone} on:change={handleStatusChange} />
	</div>
	<div class="ml-3 w-full space-y-3">
		<p class="font-medium text-slate-900">{title}</p>

		{#if description}
			<p class="mt-1 text-slate-500 text-sm">
				{description}
			</p>
		{/if}

		<div class="flex gap-4">
			<Field id={`${id}_impact`} label="Impact">
				<meter id={`${id}_impact`} value={impact} min="0" max="10" low="3" high="7">
					{impact}/10
				</meter>
			</Field>

			<Field id={`${id}_urgency`} label="Urgency">
				<meter id={`${id}_urgency`} value={urgency} min="0" max="10" low="3" high="7">
					{urgency}/10
				</meter>
			</Field>
		</div>
	</div>
	<div
		class="absolute top-0 bottom-0 right-0 translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition flex flex-col bg-blue-100 bg-opacity-40 backdrop-blur-sm px-4 py-7 gap-6 shadow-md"
	>
		<button
			class="text-blue-500"
			on:click={() => {
				dispatch('edit', id);
			}}
		>
			<span class="sr-only">Edit</span>
			<EditIcon />
		</button>
		<button
			class="text-red-500"
			on:click={() => {
				dispatch('delete', id);
			}}
		>
			<span class="sr-only">Delete</span>
			<DeleteIcon />
		</button>
	</div>
</article>
