<script lang="ts">
	import Input from '$components/Input.svelte';
	import Label from '$components/Label.svelte';

	export let type: HTMLInputElement['type'] = 'text';
	export let id: HTMLInputElement['id'];
	export let name: HTMLInputElement['name'];
	export let placeholder: HTMLInputElement['placeholder'] = '';
	export let value: HTMLInputElement['value'] = '';
	export let min: HTMLInputElement['min'] = '';
	export let max: HTMLInputElement['max'] = '';
	export let step: HTMLInputElement['step'] = '';
	export let describedby = '';
</script>

<div>
	<Label for={id}><slot /></Label>
	<div class="mt-1">
		<Input {type} {id} {name} {placeholder} {value} {min} {max} {step} {describedby} />
	</div>
	{#if $$slots.message}
		<p class="mt-2 text-sm text-gray-500" id={describedby}><slot name="message" /></p>
	{/if}
</div>
