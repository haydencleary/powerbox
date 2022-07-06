<script lang="ts">
	export let id: HTMLTextAreaElement['id'];
	export let name: HTMLTextAreaElement['name'];
	export let placeholder: HTMLInputElement['placeholder'] = '';
	export let value: HTMLInputElement['value'] = '';
	export let describedby = '';
</script>

<textarea
	rows="4"
	{name}
	{id}
	{placeholder}
	{value}
	aria-describedby={describedby}
	class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded"
/>
