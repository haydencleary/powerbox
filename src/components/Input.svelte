<script lang="ts">
	export let type: HTMLInputElement['type'] = 'text';
	export let name: HTMLInputElement['name'];
	export let id: HTMLInputElement['id'];
	export let placeholder: HTMLInputElement['placeholder'] = '';
	export let value: HTMLInputElement['value'] = '';
	export let required: HTMLInputElement['required'] = false;
	export let describedby = '';
	export let autofocus = false;
	export let pattern = '';
</script>

<input
	{type}
	{name}
	{id}
	{placeholder}
	{value}
	{required}
	{autofocus}
	{pattern}
	aria-describedby={describedby}
	class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded accent-blue"
/>
