<script lang="ts">
	import { tasks } from '$stores/taskStore';

	const NB_COLUMNS = 10;
	const NB_ROWS = 10;

	function getRow(index: number) {
		return Math.ceil((index + 1) / NB_ROWS);
	}

	function getColumn(index: number) {
		return Math.ceil((index + 1) % NB_COLUMNS) || NB_COLUMNS;
	}

	$: cells = Array(100)
		.fill(null)
		.map((cell, i) => {
			const row = getRow(i).toString();
			const column = getColumn(i).toString();

			return $tasks.filter((task) => {
				return task.urgency === row && task.impact === column;
			});
		});
</script>

<article class="grid grid-cols-10 grid-rows-[10] w-full aspect-square bg-red-400">
	{#each cells as tasks, index}
		{@const row = getRow(index)}
		{@const column = getColumn(index)}

		<div
			class="flex items-center justify-center border-black"
			class:border-r={column === NB_COLUMNS / 2}
			class:border-b={row === NB_ROWS / 2}
		>
			{#each tasks as task}
				{task.title}
			{/each}
		</div>
	{/each}
</article>
