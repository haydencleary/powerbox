<script lang="ts">
	let htmlFor: HTMLLabelElement['htmlFor'];
	export { htmlFor as for };
	export let required = false;
</script>

<label for={htmlFor} class="block text-sm font-medium text-gray-700">
	<slot />{#if required}<span class="text-blue-500">*</span>{/if}
</label>
