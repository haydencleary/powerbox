<script lang="ts">
	let htmlFor: HTMLLabelElement['htmlFor'];
	export { htmlFor as for };
</script>

<label for={htmlFor} class="block text-sm font-medium text-gray-700"><slot /></label>
