<script lang="ts">
	// TODO find a way to allow undefined props and not insert them into the DOM
	export let type: HTMLInputElement['type'] = 'text';
	export let name: HTMLInputElement['name'];
	export let id: HTMLInputElement['id'];
	export let placeholder: HTMLInputElement['placeholder'] = '';
	export let value: HTMLInputElement['value'] = '';
	export let min: HTMLInputElement['min'] = '';
	export let max: HTMLInputElement['max'] = '';
	export let step: HTMLInputElement['step'] = '';
	export let describedby = '';
</script>

<input
	{type}
	{name}
	{id}
	{placeholder}
	{value}
	{min}
	{max}
	{step}
	aria-describedby={describedby}
	class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded accent-blue"
	class:shadow-none={type === 'range'}
/>
