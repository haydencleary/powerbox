<script lang="ts">
	import { tooltip } from '$actions/tooltip';

	import { tasks } from '$stores/taskStore';

	import { TASK_STATUS_DONE } from '$types/task';
	import type { Task } from '$types/task';

	const NB_COLUMNS = 10;
	const NB_ROWS = 10;

	function getRow(index: number) {
		// Substraction is to reverse row order
		return NB_ROWS - Math.floor(index / NB_ROWS);
	}

	function getColumn(index: number) {
		return Math.ceil((index + 1) % NB_COLUMNS) || NB_COLUMNS;
	}

	function getDotColors(tasks: Task[]) {
		// All task impact and urgency values are the same here, so the first one will do.
		const [{ impact: impactStr, urgency: urgencyStr }] = tasks;
		const impact = parseInt(impactStr);
		const urgency = parseInt(urgencyStr);

		const colors = {
			main: 'bg-blue-500',
			background: 'bg-blue-400'
		};

		if (impact > 5 && urgency > 5) {
			colors.main = 'bg-red-500';
			colors.background = 'bg-red-400';
		}

		if (impact <= 5 && urgency <= 5) {
			colors.main = 'bg-green-500';
			colors.background = 'bg-green-400';
		}

		return colors;
	}

	$: cells = Array(100)
		.fill(null)
		.map((_cell, i) => {
			const row = getRow(i).toString();
			const column = getColumn(i).toString();

			return $tasks.filter((task) => {
				return task.impact === row && task.urgency === column;
			});
		});
</script>

<section class="relative">
	<span class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 -ml-px text-slate-400">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path
				fill-rule="evenodd"
				d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</span>
	<span
		class="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 mt-px mr-px text-slate-400"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path
				fill-rule="evenodd"
				d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
				clip-rule="evenodd"
			/>
		</svg>
	</span>
	<article class="grid grid-cols-10 grid-rows-[10] w-full aspect-square">
		{#each cells as tasks, index}
			{@const row = getRow(index)}
			{@const column = getColumn(index)}

			<div
				class="relative flex items-center justify-center border-slate-400 aspect-square"
				class:border-t-2={row === NB_ROWS / 2}
				class:border-r-2={column === NB_COLUMNS / 2}
			>
				{#if row === 5 && column === 1}
					<span class="absolute top-0 left-0 block text-xs font-semibold text-slate-500">
						Urgency
					</span>
				{/if}
				{#if row === 1 && column === 6}
					<span
						class="absolute bottom-0 left-0 block text-xs font-semibold text-slate-500 -rotate-90 translate-y-4 origin-top-left"
					>
						Impact
					</span>
				{/if}

				{#if tasks.length}
					{@const colors = getDotColors(tasks)}
					<div class="relative flex h-4 w-4">
						<span
							class={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colors.background}`}
						/>
						<span
							class={`relative inline-flex rounded-full h-4 w-4 ${colors.main}`}
							use:tooltip={{
								content: `<ul class="list-disc list-inside whitespace-nowrap">${tasks.reduce(
									(acc, task) => {
										return `${acc}<li><a href="#${task.id}" class="${
											task.status === TASK_STATUS_DONE ? 'line-through' : ''
										}">${task.title}</a></li>`;
									},
									''
								)}</ul>`,
								allowHTML: true
							}}
							tabindex="0"
						/>
					</div>
				{/if}
			</div>
		{/each}
	</article>
</section>
