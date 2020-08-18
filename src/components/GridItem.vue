<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script>
    export default {
        props: {
            span: {
                type: Number,
                default: 1,
            },
        },

        computed: {
            classes() {
                return [`col-span-${this.span}`]
            },
        },
    }
</script>
