<script>
    import { createEventDispatcher } from "svelte";

    export let options;
    export let disabledOption;
    export let name;

    const dispatch = createEventDispatcher();

    const handleChange = (e) => {
        dispatch('change', { value: e.target.value });
    };
</script>

<select name={name ?? ""} on:change={handleChange} class="p-2 rounded border">
    {#if disabledOption}
        <option selected={disabledOption.selected} value={disabledOption.value} disabled>{disabledOption.label}</option>
    {/if}
    {#each options as option}
        <option value={option.label} selected={option.selected}>
            {option.label}
        </option>
    {/each}
</select>