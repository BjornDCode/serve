<template>
    <button
        class="px-6 py-3 block w-full text-left focus:outline-none"
        :class="{
            'bg-gray-300': selected,
            'bg-white': !selected,
        }"
        v-on="$listeners"
    >
        <PaletteDisplayValue :value="value" :query="query" />
    </button>
</template>

<script>
    import PaletteDisplayValue from '@/components/PaletteDisplayValue'

    export default {
        components: {
            PaletteDisplayValue,
        },

        props: {
            value: String,
            query: String,
            selected: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>
