<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Field from '$components/Field.svelte';

	import type { Task } from '$types/task';

	export let task: Task;

	$: ({ id, title, description, status, urgency, impact } = task);

	const STATUS_TODO = 'todo';
	const STATUS_DONE = 'done';

	const taskDone = status === STATUS_DONE;

	const dispatch = createEventDispatcher();

	function handleStatusChange(e: Event) {
		const target = e.target as HTMLInputElement;

		if (target.checked) {
			status = STATUS_DONE;
		} else {
			status = STATUS_TODO;
		}

		// TODO update store
	}
</script>

<article class="hover:bg-blue-50 hover:bg-opacity-50 flex p-6 border-b border-slate-200">
	<div>
		<input type="checkbox" class="rounded" checked={taskDone} on:change={handleStatusChange} />
	</div>
	<div class="ml-3 w-full space-y-3">
		<div class="flex justify-between gap-4 items-start">
			<p class="font-medium text-slate-900">{title}</p>
			<button
				on:click={() => {
					dispatch('edit', id);
				}}
			>
				Edit
			</button>
		</div>

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
</article>
