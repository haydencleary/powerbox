<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Range from '$components/Range.svelte';
	import Input from '$components/Input.svelte';
	import Textarea from '$components/Textarea.svelte';

	import { addTask } from '$stores/taskStore';

	import type { Task } from '$types/task';

	const INITIAL_TASK: Task = {
		id: '',
		title: '',
		description: '',
		status: 'todo',
		urgency: '5',
		impact: '5'
	};

	export let task = INITIAL_TASK;

	$: ({ id, title, description, status, urgency, impact } = task);

	$: urgencyStr = urgency.toString();
	$: impactStr = impact.toString();

	const dispatch = createEventDispatcher();

	function handleSubmit(e: Event) {
		const formData = new FormData(e.target as HTMLFormElement);

		// Need to set any here because TypeScript doesn't know how to handle formData.entries()
		const task = Object.fromEntries((<any>formData).entries()) as Task;

		// TODO handle absent id and status values.

		if (id) {
			// Update task
		} else {
			// New task
			addTask(task);
		}

		// Close form
		dispatch('cancel');
	}
</script>

<form
	class="hover:bg-blue-50 hover:bg-opacity-50 p-6 border-b border-slate-200"
	on:submit|preventDefault={handleSubmit}
>
	<div class="space-y-3">
		<Field id="new_task_title" label="Title" required>
			<Input id="new_task_title" name="title" bind:value={title} required />
		</Field>

		<Field id="new_task_description" label="Description">
			<Textarea id="new_task_description" name="description" bind:value={description} />
		</Field>

		<Field id="new_task_impact" label="Impact">
			<Range id="new_task_impact" name="impact" bind:value={impactStr} />
		</Field>

		<Field id="new_task_urgency" label="Urgency">
			<Range id="new_task_urgency" name="urgency" bind:value={urgencyStr} />
		</Field>
	</div>
	<div class="mt-6 flex justify-end space-x-3">
		<Button type="reset" variant="secondary" on:click={() => dispatch('cancel')}>Cancel</Button>
		<Button type="submit">Submit</Button>
	</div>
</form>
