<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@rgossiaux/svelte-headlessui';
	import Field from '$components/Field.svelte';
	import EditIcon from '$icons/Edit.svelte';
	import DeleteIcon from '$icons/Delete.svelte';
	import { updateTask } from '$stores/taskStore';
	import type { Task } from '$types/task';
	import { TASK_STATUS_DONE, TASK_STATUS_TODO } from '$types/task';

	export let task: Task;

	$: ({ id, title, description, status, urgency, impact } = task);

	$: isDone = status === TASK_STATUS_DONE;

	$: ({
		url: { hash }
	} = $page);

	$: isHighlighted = hash === `#${task.id}`;

	const dispatch = createEventDispatcher();

	function handleStatusChange(e: Event) {
		const target = e.target as HTMLInputElement;

		if (target.checked) {
			status = TASK_STATUS_DONE;
		} else {
			status = TASK_STATUS_TODO;
		}

		updateTask({ ...task, status });
	}
</script>

<article
	id={task.id}
	class={`relative hover:bg-blue-50 hover:bg-opacity-50 flex border-b border-slate-200 group transition justify-center ${
		isHighlighted ? 'shadow-inner shadow-blue-500/50' : ''
	}`}
>
	<div class="flex w-full max-w-3xl px-4 py-6 sm:px-6">
		<div>
			<input type="checkbox" class="rounded" checked={isDone} on:change={handleStatusChange} />
		</div>
		<div class="ml-3 w-full space-y-3">
			<div class="flex justify-between items-start">
				<p
					class="font-medium"
					class:text-slate-900={!isDone}
					class:text-slate-500={isDone}
					class:line-through={isDone}
				>
					{title}
				</p>

				<Menu
					as="div"
					class={({ open }) => `relative inline-block text-left ${open ? 'z-10' : ''}`}
				>
					<div>
						<MenuButton
							class="rounded-full flex items-center text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-blue-500"
						>
							<span class="sr-only">Open options</span>
							<!-- Heroicon name: solid/dots-vertical -->
							<svg
								class="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
								/>
							</svg>
						</MenuButton>
					</div>

					<Transition
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<MenuItems
							class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<div class="py-1">
								<MenuItem
									class={({ active }) =>
										`flex items-center px-4 py-2 text-sm cursor-pointer ${
											active ? 'bg-slate-100 text-slate-900' : 'text-slate-700'
										}`}
									on:click={() => {
										dispatch('edit', id);
									}}
								>
									<EditIcon /><span class="ml-2">Edit</span>
								</MenuItem>
								<MenuItem
									class={({ active }) =>
										`flex items-center px-4 py-2 text-sm cursor-pointer ${
											active ? 'bg-red-100 text-red-900' : 'text-red-700'
										}`}
									on:click={() => {
										dispatch('delete', id);
									}}
								>
									<DeleteIcon /><span class="ml-2">Delete</span>
								</MenuItem>
							</div>
						</MenuItems>
					</Transition>
				</Menu>
			</div>

			{#if description}
				<p class="mt-1 text-slate-500 text-sm whitespace-pre-line">
					{description}
				</p>
			{/if}

			{#if !isDone}
				<div class="flex gap-4">
					<Field id={`${id}_impact`} label="Impact">
						<meter id={`${id}_impact`} value={impact} min="1" max="10" low="3" optimum="5" high="7">
							{impact}/10
						</meter>
					</Field>

					<Field id={`${id}_urgency`} label="Urgency">
						<meter
							id={`${id}_urgency`}
							value={urgency}
							min="1"
							max="10"
							low="3"
							optimum="5"
							high="7"
						>
							{urgency}/10
						</meter>
					</Field>
				</div>
			{/if}
		</div>
	</div>
</article>
