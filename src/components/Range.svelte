<script lang="ts">
	export let name: HTMLInputElement['name'];
	export let id: HTMLInputElement['id'];
	export let value: HTMLInputElement['value'] = '';
</script>

<input
	type="range"
	{name}
	{id}
	{value}
	min="1"
	max="10"
	step="1"
	class="focus:ring-blue-500 focus:border-blue-500 block w-full accent-blue-500"
/>
