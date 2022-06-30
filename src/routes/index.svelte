<script lang="ts">
	import { tasks, deleteTask } from '$stores/taskStore';

	import Button from '$components/Button.svelte';
	import EditTask from '$components/EditTask.svelte';
	import Graph from '$components/Graph.svelte';
	import ViewTask from '$components/ViewTask.svelte';

	const TAB_TASKS = 'tasks';
	const TAB_GRAPH = 'graph';

	type Tab = typeof TAB_TASKS | typeof TAB_GRAPH;

	let newTask = false;
	let editing: string | null = null;
	let tab: Tab = TAB_TASKS;

	function handleTab(newTab: Tab) {
		tab = newTab;
	}
</script>

<main class="flex-1 flex overflow-hidden">
	<div class="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden">
		<nav aria-label="Menu" class="bg-white border-b border-slate-200 lg:hidden">
			<div class="max-w-3xl mx-auto py-3 px-4 flex items-start justify-center sm:px-6 lg:px-8">
				<span class="relative z-0 inline-flex shadow-sm rounded w-full">
					<button
						type="button"
						class={`relative w-1/2 inline-flex items-center justify-center px-4 py-2 rounded-l border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
							tab === TAB_TASKS ? 'bg-slate-50' : 'bg-white'
						}`}
						on:click={() => handleTab(TAB_TASKS)}>Tasks</button
					>
					<button
						type="button"
						class={`-ml-px relative w-1/2 inline-flex items-center justify-center px-4 py-2 rounded-r border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
							tab === TAB_GRAPH ? 'bg-slate-50' : 'bg-white'
						}`}
						on:click={() => handleTab(TAB_GRAPH)}>Graph</button
					>
				</span>
			</div>
		</nav>

		<div class="relative flex-1 flex lg:overflow-hidden">
			<!-- Secondary sidebar -->
			<div
				aria-label="Sections"
				class="flex-shrink-0 w-full lg:w-96 bg-white border-r border-slate-200 lg:flex lg:flex-col"
				class:block={tab === TAB_TASKS}
				class:hidden={tab !== TAB_TASKS}
			>
				<div class="flex-shrink-0 border-b border-slate-200 flex justify-center">
					<div class="flex items-center justify-between w-full max-w-3xl h-16 px-4 sm:px-6">
						<p class="text-lg font-medium text-slate-900">Tasks</p>
						<Button
							on:click={() => {
								newTask = true;
								editing = null;
							}}>New</Button
						>
					</div>
				</div>
				<div class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth">
					{#each $tasks as task (task.id)}
						{#if task.id === editing}
							<EditTask
								{task}
								on:cancel={() => {
									editing = null;
								}}
							/>
						{:else}
							<ViewTask
								{task}
								on:edit={(event) => {
									editing = event.detail;
									newTask = false;
								}}
								on:delete={(event) => {
									deleteTask(event.detail);
								}}
							/>
						{/if}
					{/each}
					{#if newTask}
						<EditTask
							on:cancel={() => {
								newTask = false;
							}}
						/>
					{/if}
				</div>
			</div>

			<!-- Main content -->
			<div
				class="flex-1 lg:overflow-y-auto lg:block"
				class:block={tab === TAB_GRAPH}
				class:hidden={tab !== TAB_GRAPH}
			>
				<div class="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
					<Graph />
				</div>
			</div>
		</div>
	</div>
</main>
