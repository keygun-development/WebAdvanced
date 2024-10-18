<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    export let variant;
    export let as = null;

    const getVariantClass = (variant) => {
        switch (variant) {
            case 'primary':
                return 'bg-primary';
            case 'secondary':
                return 'bg-secondary';
            case 'error':
                return 'bg-red-500';
            case 'success':
                return 'bg-green-500';
            case 'blue':
                return 'bg-blue-400';
            default:
                return '';
        }
    };
    </script>
    {#if as}
        <svelte:element
                this={as}
                {...$$restProps}
                class={"p-2 rounded text-white hover:bg-opacity-80 duration-300 " + getVariantClass(variant)}>
            <slot></slot>
        </svelte:element>
    {:else}
        <button
                {...$$restProps}
                on:click={() => dispatch('click')}
                class={"p-2 rounded text-white hover:bg-opacity-80 duration-300 " + getVariantClass(variant)}>
            <slot></slot>
        </button>
    {/if}