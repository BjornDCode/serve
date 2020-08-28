<template>
    <Copy
        :component="component"
        class="font-semibold tracking-tighter leading-none"
        :class="classes"
        v-bind="$attrs"
    >
        <slot />
    </Copy>
</template>

<script>
    import Copy from '@/components/Copy'

    export default {
        components: {
            Copy,
        },

        props: {
            level: {
                type: Number,
                default: 1,
                validator: value => [1, 2, 3, 4].includes(value),
            },
        },

        computed: {
            component() {
                return `h${this.level}`
            },

            classes() {
                const sizes = {
                    1: '3xl',
                    2: '2xl',
                    3: 'xl',
                    4: 'lg',
                }

                return `text-${sizes[this.level]}`
            },
        },
    }
</script>
