<template>
    <Copy size="sm" weight="medium" color="gray" shade="700">
        <TextHighlight
            :queries="[query]"
            :caseSensitive="false"
            highlightClass="highlighted"
        >
            {{ value }}
        </TextHighlight>
    </Copy>
</template>

<script>
    import Copy from '@/components/Copy'
    import TextHighlight from 'vue-text-highlight'

    export default {
        components: {
            Copy,
            TextHighlight,
        },

        props: {
            value: {
                type: String,
                required: true,
            },
            query: {
                type: String,
                required: true,
            },
        },
    }
</script>

<style>
    mark.highlighted {
        @apply text-black bg-transparent font-bold;
    }
</style>
