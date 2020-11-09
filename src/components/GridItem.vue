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
            start: {
                type: Number,
            },
        },

        computed: {
            classes() {
                return [
                    `col-span-${this.span}`,
                    ...(this.start ? [`col-start-${this.start}`] : []),
                ]
            },
        },
    }
</script>
