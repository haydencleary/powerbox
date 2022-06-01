<script lang="ts">
	import { tasks } from '$stores/taskStore';

	const NB_COLUMNS = 10;
	const NB_ROWS = 10;

	function getRow(index: number) {
		// Substraction is to reverse row order
		return NB_ROWS - Math.floor(index / NB_ROWS);
	}

	function getColumn(index: number) {
		return Math.ceil((index + 1) % NB_COLUMNS) || NB_COLUMNS;
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

<article class="grid grid-cols-10 grid-rows-[10] w-full aspect-square">
	{#each cells as tasks, index}
		{@const row = getRow(index)}
		{@const column = getColumn(index)}

		<div
			class="flex items-center justify-center border-slate-400 aspect-square"
			class:border-t-2={row === NB_ROWS / 2}
			class:border-r-2={column === NB_COLUMNS / 2}
		>
			{#each tasks as task}
				<span class="relative flex h-3 w-3">
					<span
						class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
					/>
					<span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
				</span>
			{/each}
		</div>
	{/each}
</article>
