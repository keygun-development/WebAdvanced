<script>
    export let variant;
</script>

{#if variant === 'success'}
    <div class="bg-green-500 text-white p-2 rounded h-fit">
        <slot></slot>
    </div>
{:else if variant === 'error'}
    <div class="bg-red-500 text-white p-2 rounded h-fit">
        <slot></slot>
    </div>
{/if}