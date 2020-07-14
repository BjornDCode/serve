<template>
    <Component :is="component" class="flex" :class="classes">
        <slot />
    </Component>
</template>

<script>
    import {
        isValidColor,
        isValidShade,
        isValidSpace,
        isValidAlignment,
        isValidJustification,
    } from '@/config/validators'

    export default {
        props: {
            component: {
                type: String,
                default: 'div',
            },
            color: {
                type: String,
                default: 'transparent',
                validator: isValidColor,
            },
            shade: {
                type: String,
                validator: isValidShade,
            },
            space: {
                type: Number,
                validator: isValidSpace,
            },
            spaceX: {
                type: Number,
                validator: isValidSpace,
            },
            spaceY: {
                type: Number,
                validator: isValidSpace,
            },
            align: {
                type: String,
                default: 'start',
                validator: isValidAlignment,
            },
            justify: {
                type: String,
                default: 'start',
                validator: isValidJustification,
            },
        },

        computed: {
            classes() {
                return [
                    `bg-${this.color}${this.shade ? `-${this.shade}` : ''}`,
                    `items-${this.align}`,
                    `justify-${this.justify}`,
                    ...(this.spaceX ? [`px-${this.spaceX}`] : []),
                    ...(this.spaceY ? [`py-${this.spaceY}`] : []),
                    ...(this.space ? [`p-${this.space}`] : []),
                ]
            },
        },
    }
</script>
