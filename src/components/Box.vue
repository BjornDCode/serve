<template>
    <Component
        :is="component"
        class="flex"
        :class="classes"
        :style="styles"
        v-on="$listeners"
        v-bind="$attrs"
    >
        <slot />
    </Component>
</template>

<script>
    import {
        isValidSize,
        isValidColor,
        isValidShade,
        isValidSpace,
        isValidShadow,
        isValidOverflow,
        isValidMaxWidth,
        isValidPosition,
        isValidAlignment,
        isValidDirection,
        isValidMinHeight,
        isValidBorderWidth,
        isValidBorderRadius,
        isValidJustification,
        isValidBackgroundOpacity,
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
            direction: {
                type: String,
                default: 'row',
                validator: isValidDirection,
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
            position: {
                type: String,
                validator: isValidPosition,
            },
            left: {
                type: Number,
            },
            right: {
                type: Number,
            },
            top: {
                type: Number,
            },
            bottom: {
                type: Number,
            },
            borderWidth: {
                type: Number,
                validator: isValidBorderWidth,
            },
            borderWidthY: {
                type: Number,
                validator: isValidBorderWidth,
            },
            borderWidthX: {
                type: Number,
                validator: isValidBorderWidth,
            },
            borderWidthT: {
                type: Number,
                validator: isValidBorderWidth,
            },
            borderWidthB: {
                type: Number,
                validator: isValidBorderWidth,
            },
            borderWidthL: {
                type: Number,
                validator: isValidBorderWidth,
            },
            borderWidthR: {
                type: Number,
                validator: isValidBorderWidth,
            },
            borderColor: {
                type: String,
                validator: isValidColor,
            },
            borderShade: {
                type: String,
                validator: isValidShade,
            },
            borderRadius: {
                type: String,
                default: 'none',
                validator: isValidBorderRadius,
            },
            shadow: {
                type: String,
                default: 'none',
                validator: isValidShadow,
            },
            maxWidth: {
                type: [String, Number],
                validator: isValidMaxWidth,
            },
            minHeight: {
                type: [String, Number],
                validator: isValidMinHeight,
            },
            backgroundOpacity: {
                type: Number,
                validator: isValidBackgroundOpacity,
            },
            overflow: {
                type: String,
                validator: isValidOverflow,
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
                    `flex-${this.direction}`,
                    ...(this.borderRadius === 'normal'
                        ? [`rounded`]
                        : [`rounded-${this.borderRadius}`]),
                    ...(this.shadow === 'normal'
                        ? [`shadow`]
                        : [`shadow-${this.shadow}`]),
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
                    ...(this.position ? [this.position] : []),
                    ...(this.size ? [`h-${this.size}`, `w-${this.size}`] : []),
                    ...(this.maxWidth ? [`max-w-${this.maxWidth}`] : []),
                    ...(this.minHeight ? [`min-h-${this.minHeight}`] : []),
                    ...(this.borderWidth ? [`border-${this.borderWidth}`] : []),
                    ...(this.borderWidthY
                        ? [`border-y-${this.borderWidthY}`]
                        : []),
                    ...(this.borderWidthX
                        ? [`border-x-${this.borderWidthX}`]
                        : []),
                    ...(this.borderWidthT
                        ? [`border-t-${this.borderWidthT}`]
                        : []),
                    ...(this.borderWidthB
                        ? [`border-b-${this.borderWidthB}`]
                        : []),
                    ...(this.borderWidthL
                        ? [`border-l-${this.borderWidthL}`]
                        : []),
                    ...(this.borderWidthR
                        ? [`border-r-${this.borderWidthR}`]
                        : []),
                    ...(this.borderColor
                        ? [
                              `border-${this.borderColor}${
                                  this.borderShade ? `-${this.borderShade}` : ''
                              }`,
                          ]
                        : []),
                    ...(this.backgroundOpacity
                        ? [`bg-opacity-${this.backgroundOpacity}`]
                        : []),
                    ...(this.overflow ? [`overflow-${this.overflow}`] : []),
                ]
            },

            styles() {
                return [
                    ...(this.left === 0
                        ? [{ left: `0rem` }]
                        : this.left
                        ? [{ left: `${this.left / 4}rem` }]
                        : []),
                    ...(this.right === 0
                        ? [{ right: `0rem` }]
                        : this.right
                        ? [{ right: `${this.right / 4}rem` }]
                        : []),
                    ...(this.top === 0
                        ? [{ top: `0rem` }]
                        : this.top
                        ? [{ top: `${this.top / 4}rem` }]
                        : []),
                    ...(this.bottom === 0
                        ? [{ bottom: `0rem` }]
                        : this.bottom
                        ? [{ bottom: `${this.bottom / 4}rem` }]
                        : []),
                ]
            },
        },
    }
</script>
