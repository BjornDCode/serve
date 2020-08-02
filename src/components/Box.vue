<template>
    <Component :is="component" class="flex" :class="classes" v-on="$listeners">
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
            spaceT: {
                type: Number,
                validator: isValidSpace,
            },
            spaceB: {
                type: Number,
                validator: isValidSpace,
            },
            spaceR: {
                type: Number,
                validator: isValidSpace,
            },
            spaceL: {
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
            expand: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            classes() {
                return [
                    `bg-${this.color}${this.shade ? `-${this.shade}` : ''}`,
                    `items-${this.align}`,
                    `justify-${this.justify}`,
                    ...(this.expand ? [`flex-1`] : []),
                    ...(this.spaceX ? [`px-${this.spaceX}`] : []),
                    ...(this.spaceY ? [`py-${this.spaceY}`] : []),
                    ...(this.spaceT ? [`pt-${this.spaceT}`] : []),
                    ...(this.spaceB ? [`pb-${this.spaceB}`] : []),
                    ...(this.spaceR ? [`pr-${this.spaceR}`] : []),
                    ...(this.spaceL ? [`pl-${this.spaceL}`] : []),
                    ...(this.space ? [`p-${this.space}`] : []),
                    ...(this.height ? [`h-${this.height}`] : []),
                    ...(this.width ? [`w-${this.width}`] : []),
                    ...(this.size ? [`h-${this.size}`, `w-${this.size}`] : []),
                ]
            },
        },
    }
</script>
