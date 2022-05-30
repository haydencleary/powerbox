<script lang="ts">
	import Label from '$components/Label.svelte';

	export let id: string;
	export let label: string;
	// export let describedby = '';
</script>

<div>
	<Label for={id}>{label}</Label>
	<div class="mt-1">
		<slot />
	</div>
	<!-- {#if $$slots.message}
		<p class="mt-2 text-sm text-gray-500" id={describedby}><slot name="message" /></p>
	{/if} -->
</div>
