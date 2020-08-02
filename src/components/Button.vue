<template>
    <Box
        component="button"
        :type="type"
        v-bind="$attrs"
        :color="styles.background.color"
        :shade="styles.background.shade"
        :spaceX="4"
        :spaceY="1"
        class="rounded border transform focus:outline-none focus-visible:shadow-outline"
        :class="[...styles.classes, ...(this.disabled ? ['opacity-75'] : [])]"
        :disabled="disabled"
        v-on="$listeners"
    >
        <Copy
            size="xs"
            :color="styles.text.color"
            :shade="styles.text.shade"
            weight="medium"
        >
            <slot />
        </Copy>
    </Box>
</template>

<script>
    import Box from '@/components/Box'
    import Copy from '@/components/Copy'

    export default {
        components: {
            Box,
            Copy,
        },

        props: {
            type: {
                type: String,
                default: 'button',
                validator: value => ['button', 'submit'].includes(value),
            },
            variant: {
                type: String,
                default: 'primary',
                validator: value => ['primary', 'secondary'].includes(value),
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            isPrimary() {
                return this.variant === 'primary'
            },

            styles() {
                return this.isPrimary
                    ? {
                          background: {
                              color: 'indigo',
                              shade: '700',
                          },
                          text: {
                              color: 'indigo',
                              shade: '100',
                          },
                          classes: ['border-indigo-800 active:shadow-inner-lg'],
                      }
                    : {
                          background: {
                              color: 'gray',
                              shade: '300',
                          },
                          text: {
                              color: 'gray',
                              shade: '800',
                          },
                          classes: ['border-gray-400 active:shadow-inner'],
                      }
            },
        },
    }
</script>
