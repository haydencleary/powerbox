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

<section>
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
