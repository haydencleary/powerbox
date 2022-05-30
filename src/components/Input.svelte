<script lang="ts">
	export let type: HTMLInputElement['type'] = 'text';
	export let name: HTMLInputElement['name'];
	export let id: HTMLInputElement['id'];
	export let placeholder: HTMLInputElement['placeholder'] = '';
	export let value: HTMLInputElement['value'] = '';
	export let describedby = '';
</script>

<input
	{type}
	{name}
	{id}
	{placeholder}
	{value}
	aria-describedby={describedby}
	class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded accent-blue"
/>
