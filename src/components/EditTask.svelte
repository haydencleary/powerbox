<script lang="ts">
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Range from '$components/Range.svelte';
	import Input from '$components/Input.svelte';
	import Textarea from '$components/Textarea.svelte';

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
		<Field id="new_task_title" label="Title">
			<Input id="new_task_title" name="title" bind:value={title} />
		</Field>

		<Field id="new_task_description" label="Description">
			<Textarea id="new_task_description" name="description" bind:value={description} />
		</Field>

		<Field id="new_task_impact" label="Impact">
			<Range id="new_task_impact" name="impact" bind:value={impactStr} />
		</Field>

		<Field id="new_task_urgency" label="Urgency">
			<Range id="new_task_urgency" name="urgency" bind:value={urgencyStr} />
		</Field>
	</div>
	<div class="mt-6 flex justify-end space-x-3">
		<Button variant="secondary">Cancel</Button>
		<Button>Submit</Button>
	</div>
</article>
