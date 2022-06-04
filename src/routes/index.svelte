<script lang="ts">
	import { tasks, deleteTask } from '$stores/taskStore';

	import Button from '$components/Button.svelte';
	import EditTask from '$components/EditTask.svelte';
	import Graph from '$components/Graph.svelte';
	import ViewTask from '$components/ViewTask.svelte';

	let newTask = false;
	let editing: string | null = null;
</script>

<main class="flex-1 flex overflow-hidden">
	<div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
		<!-- Breadcrumb -->
		<nav aria-label="Breadcrumb" class="bg-white border-b border-slate-200 xl:hidden">
			<div class="max-w-5xl mx-auto py-3 px-4 flex items-start sm:px-6 lg:px-8">
				<a
					href="#"
					class="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-slate-900"
				>
					<!-- Heroicon name: solid/chevron-left -->
					<svg
						class="h-5 w-5 text-slate-400"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>Tasks</span>
				</a>
			</div>
		</nav>

		<div class="flex-1 flex xl:overflow-hidden">
			<!-- Secondary sidebar -->
			<div
				aria-label="Sections"
				class="hidden flex-shrink-0 w-96 bg-white border-r border-slate-200 xl:flex xl:flex-col"
			>
				<div
					class="flex-shrink-0 h-16 px-6 border-b border-slate-200 flex items-center justify-between"
				>
					<p class="text-lg font-medium text-slate-900">Tasks</p>
					<Button
						on:click={() => {
							newTask = true;
							editing = null;
						}}>New</Button
					>
				</div>
				<div class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth">
					{#each $tasks as task}
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
			<div class="flex-1 xl:overflow-y-auto">
				<div class="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
					<Graph />
				</div>
			</div>
		</div>
	</div>
</main>
