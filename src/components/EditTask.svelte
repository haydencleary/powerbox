<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { scrollIntoView } from '$actions/scrollIntoView';
	import { tooltip } from '$actions/tooltip';

	import Badge from '$components/Badge.svelte';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Range from '$components/Range.svelte';
	import Input from '$components/Input.svelte';
	import Textarea from '$components/Textarea.svelte';

	import { createTask, updateTask, tasks } from '$stores/taskStore';

	import type { Task } from '$types/task';
	import { TASK_STATUS_DONE } from '$types/task';

	const INITIAL_TASK: Task = {
		id: '',
		title: '',
		description: '',
		status: 'todo',
		urgency: '5',
		impact: '5',
		obt: false
	};

	export let task = INITIAL_TASK;

	$: ({ title, description, status, urgency, impact, obt } = task);

	$: isDone = status === TASK_STATUS_DONE;

	$: urgencyStr = urgency.toString();
	$: impactStr = impact.toString();

	$: disableObt = $tasks.filter((task) => task.obt).length > 0;

	const dispatch = createEventDispatcher();

	function handleSubmit(e: Event) {
		const formData = new FormData(e.target as HTMLFormElement);

		// If the `obt` checkbox isn't checked, no value is returned.
		// We also want the value to be a boolean so we have to set it manually, as inputs return strings or numbers.
		let obt = false;

		if (formData.has('obt')) {
			obt = true;
		}

		// Need to set any here because TypeScript doesn't know how to handle formData.entries()
		const taskEntries = Object.fromEntries(
			[...(<any>formData).entries()].map(([name, value]) => [name, value.trim()])
		);

		// Override any `obt` value that may be returned in `taskEntries`.
		const submittedTask = { ...task, ...taskEntries, obt };

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
	class="hover:bg-blue-50 hover:bg-opacity-50 border-b border-slate-200"
	on:submit|preventDefault={handleSubmit}
	use:scrollIntoView
>
	<div class="max-w-3xl mx-auto px-4 py-6 sm:px-6">
		<div class="space-y-3">
			<Field id="edit_task_title" label="Title" required>
				<Input
					id="edit_task_title"
					name="title"
					bind:value={title}
					required
					autofocus
					pattern=".*\S+.*"
				/>
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

			<div class="flex items-center">
				<label class="flex items-center text-slate-700">
					<input
						type="checkbox"
						name="obt"
						class="rounded mr-2"
						checked={obt}
						disabled={disableObt && !obt}
					/>
					One big thing
				</label>
				<span
					class="inline-flex text-slate-400 hover:text-slate-500 ml-2 rounded-full"
					tabindex="0"
					use:tooltip={{
						content: 'The most important task to complete. Only one allowed at a time.'
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</span>
			</div>
		</div>

		<div class="mt-6 flex justify-between items-center">
			<Badge variant={isDone ? 'done' : 'todo'}>
				{isDone ? 'Done' : 'Todo'}
			</Badge>

			<div class="flex space-x-3">
				<Button type="reset" variant="secondary" on:click={handleCancel}>Cancel</Button>
				<Button type="submit">Submit</Button>
			</div>
		</div>
	</div>
</form>
