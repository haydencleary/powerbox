<script lang="ts">
	import Textarea from '$components/Textarea.svelte';
	import Label from '$components/Label.svelte';

	export let id: string;
	export let name: string;
	export let placeholder: HTMLTextAreaElement['placeholder'] = '';
	export let value: HTMLTextAreaElement['value'] = '';
	export let describedby = '';
</script>

<div>
	<Label for={id}><slot /></Label>
	<div class="mt-1">
		<Textarea {id} {name} {placeholder} {value} {describedby} />
	</div>
	{#if $$slots.message}
		<p class="mt-2 text-sm text-gray-500" id={describedby}><slot name="message" /></p>
	{/if}
</div>
