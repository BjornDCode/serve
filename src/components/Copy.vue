<template>
    <Component :is="component" :class="classes">
        <slot />
    </Component>
</template>

<script>
    import {
        isValidColor,
        isValidShade,
        isValidWeight,
        isValidFontSize,
        isValidDecoration,
        isValidLineHeight,
        isValidTextAlignment,
    } from '@/config/validators'

    import { match } from '@/helpers/methods'

    export default {
        props: {
            component: {
                type: String,
                default: 'span',
            },
            size: {
                type: String,
                default: 'base',
                validator: isValidFontSize,
            },
            color: {
                type: String,
                default: 'black',
                validator: isValidColor,
            },
            shade: {
                type: String,
                validator: isValidShade,
            },
            weight: {
                type: String,
                default: 'normal',
                validator: isValidWeight,
            },
            align: {
                type: String,
                default: 'left',
                validator: isValidTextAlignment,
            },
            lineHeight: {
                type: String,
                default: 'none',
                validator: isValidLineHeight,
            },
            decoration: {
                type: String,
                default: 'none',
                validator: isValidDecoration,
            },
            capitalised: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            decorationClass() {
                return match(this.decoration, {
                    underline: 'underline',
                    'line-through': 'line-through',
                    none: 'no-underline',
                })
            },

            classes() {
                console.log(this.align)
                return [
                    `text-${this.size}`,
                    `text-${this.color}${this.shade ? `-${this.shade}` : ''}`,
                    `font-${this.weight}`,
                    `text-${this.align}`,
                    `leading-${this.lineHeight}`,
                    ...(this.capitalised ? ['capitalize'] : []),
                    ...(this.decoration ? [this.decorationClass] : []),
                ]
            },
        },
    }
</script>
