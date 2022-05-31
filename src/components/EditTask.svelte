<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Range from '$components/Range.svelte';
	import Input from '$components/Input.svelte';
	import Textarea from '$components/Textarea.svelte';

	import { createTask, updateTask } from '$stores/taskStore';

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

	$: ({ title, description, urgency, impact } = task);

	$: urgencyStr = urgency.toString();
	$: impactStr = impact.toString();

	const dispatch = createEventDispatcher();

	function handleSubmit(e: Event) {
		const formData = new FormData(e.target as HTMLFormElement);

		// TODO trim text field values

		// Need to set any here because TypeScript doesn't know how to handle formData.entries()
		const taskEntries = Object.fromEntries((<any>formData).entries());

		const submittedTask = { ...task, ...taskEntries };

		if (submittedTask.id) {
			updateTask(submittedTask);
		} else {
			createTask(submittedTask);
		}

		// Close form
		handleCancel();
	}

	function handleCancel() {
		dispatch('cancel');
	}
</script>

<form
	class="hover:bg-blue-50 hover:bg-opacity-50 p-6 border-b border-slate-200"
	on:submit|preventDefault={handleSubmit}
>
	<div class="space-y-3">
		<Field id="edit_task_title" label="Title" required>
			<Input id="edit_task_title" name="title" bind:value={title} required autofocus />
		</Field>

		<Field id="edit_task_description" label="Description">
			<Textarea id="edit_task_description" name="description" bind:value={description} />
		</Field>

		<Field id="edit_task_impact" label="Impact">
			<Range id="edit_task_impact" name="impact" bind:value={impactStr} />
		</Field>

		<Field id="edit_task_urgency" label="Urgency">
			<Range id="edit_task_urgency" name="urgency" bind:value={urgencyStr} />
		</Field>
	</div>
	<div class="mt-6 flex justify-end space-x-3">
		<Button type="reset" variant="secondary" on:click={handleCancel}>Cancel</Button>
		<Button type="submit">Submit</Button>
	</div>
</form>
