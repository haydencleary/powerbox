<script lang="ts">
	export let title = '';
	export let description = '';
	export let status = 'TODO';
	export let urgency = 5;
	export let impact = 5;
</script>

<article class="hover:bg-blue-50 hover:bg-opacity-50 flex p-6 border-b border-slate-200">
	<div>
		<input type="checkbox" class="rounded" />
	</div>
	<div class="ml-3">
		<p class="font-medium text-slate-900">{title}</p>
		<p class="mt-1 text-slate-500 text-sm">
			{description}
		</p>
		<details class="mt-3 text-sm">
			<summary>Expand</summary>

			<label class="flex flex-col text-sm font-medium text-slate-900 mt-2">
				<span>Impact</span>
				<input type="range" step="1" min="0" max="10" bind:value={impact} class="mt-1" />
			</label>
			<label class="flex flex-col text-sm font-medium text-slate-900 mt-2">
				<span>Urgency</span>
				<input type="range" step="1" min="0" max="10" bind:value={urgency} class="mt-1" />
			</label>
		</details>
	</div>
</article>
