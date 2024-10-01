<script>
    import { createEventDispatcher } from "svelte";

    export let options;
    export let disabledOption;
    const dispatch = createEventDispatcher();
</script>
<select on:change={(e) => dispatch('change', { value: e.target})} class="p-2 rounded border">
    {#if disabledOption}
        <option selected={disabledOption.selected} value={disabledOption.value} disabled={true}>{disabledOption.label}</option>
    {/if}
    {#each options as option}
        <option value={option.value} selected={option.selected}>
            {option.label}
        </option>
    {/each}
</select>