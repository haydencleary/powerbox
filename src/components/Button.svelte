<script lang="ts">
	export let type: HTMLButtonElement['type'] = 'button';
</script>

<button
	{type}
	class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
	on:click
>
	<slot />
</button>
