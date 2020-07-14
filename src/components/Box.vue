<template>
    <Component :is="component" class="flex" :class="classes">
        <slot />
    </Component>
</template>

<script>
    import {
        isValidSize,
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
            height: {
                type: [Number, String],
                validator: isValidSize,
            },
            width: {
                type: [Number, String],
                validator: isValidSize,
            },
            size: {
                type: [Number, String],
                validator: isValidSize,
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
                    ...(this.height ? [`h-${this.height}`] : []),
                    ...(this.width ? [`w-${this.width}`] : []),
                    ...(this.size ? [`h-${this.size}`, `w-${this.size}`] : []),
                ]
            },
        },
    }
</script>
