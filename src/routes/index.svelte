<script lang="ts">
	import { tasks, deleteTask } from '$stores/taskStore';

	import Button from '$components/Button.svelte';
	import EditTask from '$components/EditTask.svelte';
	import ViewTask from '$components/ViewTask.svelte';

	let newTask = false;
	let editing: string | null = null;
</script>

<div class="h-full flex">
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	<div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
		<!--
		Off-canvas menu backdrop, show/hide based on off-canvas menu state.
  
		Entering: "transition-opacity ease-linear duration-300"
		  From: "opacity-0"
		  To: "opacity-100"
		Leaving: "transition-opacity ease-linear duration-300"
		  From: "opacity-100"
		  To: "opacity-0"
	  -->
		<div class="fixed inset-0 bg-slate-600 bg-opacity-75" />

		<div class="fixed inset-0 flex z-40">
			<!--
		  Off-canvas menu, show/hide based on off-canvas menu state.
  
		  Entering: "transition ease-in-out duration-300 transform"
			From: "-translate-x-full"
			To: "translate-x-0"
		  Leaving: "transition ease-in-out duration-300 transform"
			From: "translate-x-0"
			To: "-translate-x-full"
		-->
			<div class="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
				<!--
			Close button, show/hide based on off-canvas menu state.
  
			Entering: "ease-in-out duration-300"
			  From: "opacity-0"
			  To: "opacity-100"
			Leaving: "ease-in-out duration-300"
			  From: "opacity-100"
			  To: "opacity-0"
		  -->
				<div class="absolute top-0 right-0 -mr-12 pt-4">
					<button
						type="button"
						class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					>
						<span class="sr-only">Close sidebar</span>
						<!-- Heroicon name: outline/x -->
						<svg
							class="h-6 w-6 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div class="pt-5 pb-4">
					<div class="flex-shrink-0 flex items-center px-4">
						<img
							class="h-8 w-auto"
							src="https://tailwindui.com/img/logos/workflow-mark.svg?color=blue&shade=600"
							alt="Workflow"
						/>
					</div>
					<nav aria-label="Sidebar" class="mt-5">
						<div class="px-2 space-y-1">
							<a
								href="#"
								class="group p-2 rounded-md flex items-center text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
							>
								<!-- Heroicon name: outline/document-text -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mr-4 h-6 w-6 text-slate-400 group-hover:text-slate-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								Tasks
							</a>
						</div>
					</nav>
				</div>
				<!-- <div class="flex-shrink-0 flex border-t border-slate-200 p-4">
					<a href="#" class="flex-shrink-0 group block">
						<div class="flex items-center">
							<div>
								<img
									class="inline-block h-10 w-10 rounded-full"
									src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
									alt=""
								/>
							</div>
							<div class="ml-3">
								<p class="text-base font-medium text-slate-700 group-hover:text-slate-900">
									Lisa Marie
								</p>
								<p class="text-sm font-medium text-slate-500 group-hover:text-slate-700">
									Account Settings
								</p>
							</div>
						</div>
					</a>
				</div> -->
			</div>

			<div class="flex-shrink-0 w-14" aria-hidden="true">
				<!-- Force sidebar to shrink to fit close icon -->
			</div>
		</div>
	</div>

	<!-- Static sidebar for desktop -->
	<div class="hidden lg:flex lg:flex-shrink-0">
		<div class="flex flex-col w-20">
			<div class="flex-1 flex flex-col min-h-0 overflow-y-auto bg-blue-600">
				<div class="flex-1">
					<div class="bg-blue-700 py-4 flex items-center justify-center">
						<img
							class="h-8 w-auto"
							src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
							alt="Workflow"
						/>
					</div>
					<nav aria-label="Sidebar" class="py-6 flex flex-col items-center space-y-3">
						<a href="#" class="flex items-center p-4 rounded-lg text-blue-200 hover:bg-blue-700">
							<!-- Heroicon name: outline/document-text -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							<span class="sr-only">Tasks</span>
						</a>
					</nav>
				</div>
				<!-- <div class="flex-shrink-0 flex pb-5">
					<a href="#" class="flex-shrink-0 w-full">
						<img
							class="block mx-auto h-10 w-10 rounded-full"
							src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
							alt=""
						/>
						<div class="sr-only">
							<p>Lisa Marie</p>
							<p>Account settings</p>
						</div>
					</a>
				</div> -->
			</div>
		</div>
	</div>

	<div class="flex-1 min-w-0 flex flex-col overflow-hidden">
		<!-- Mobile top navigation -->
		<div class="lg:hidden">
			<div class="bg-blue-600 py-2 px-4 flex items-center justify-between sm:px-6">
				<div>
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
						alt="Workflow"
					/>
				</div>
				<div>
					<button
						type="button"
						class="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					>
						<span class="sr-only">Open sidebar</span>
						<!-- Heroicon name: outline/menu -->
						<svg
							class="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>
			</div>
		</div>

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
					<nav
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
						<div class="flex-1 min-h-0 overflow-y-auto">
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
					</nav>

					<!-- Main content -->
					<div class="flex-1 xl:overflow-y-auto">
						<div class="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
							<h1 class="text-3xl font-extrabold text-slate-900">Graph</h1>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</div>
