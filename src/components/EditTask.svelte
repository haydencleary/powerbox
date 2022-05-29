<script lang="ts">
	import Button from '$components/Button.svelte';
	import FieldInput from '$components/FieldInput.svelte';
	import FieldTextarea from '$components/FieldTextarea.svelte';

	export let id = '';
	export let title = '';
	export let description = '';
	export let status = 'TODO';
	export let urgency = 5;
	export let impact = 5;

	$: urgencyStr = urgency.toString();
	$: impactStr = impact.toString();
</script>

<article class="hover:bg-blue-50 hover:bg-opacity-50 p-6 border-b border-slate-200">
	<div class="space-y-3">
		<FieldInput id="new_task_title" name="title" bind:value={title}>Title</FieldInput>
		<FieldTextarea id="new_task_description" name="description" bind:value={description}>
			Description
		</FieldTextarea>
		<FieldInput
			id="new_task_impact"
			name="impact"
			type="range"
			bind:value={impactStr}
			step="1"
			min="0"
			max="10"
		>
			Impact
		</FieldInput>
		<FieldInput
			id="new_task_urgency"
			name="urgency"
			type="range"
			bind:value={urgencyStr}
			step="1"
			min="0"
			max="10"
		>
			Urgency
		</FieldInput>
	</div>
	<div class="mt-6 flex justify-end space-x-3">
		<Button variant="secondary">Cancel</Button>
		<Button>Submit</Button>
	</div>
</article>
