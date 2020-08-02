<template>
    <Stack :space="1" expand>
        <Copy
            v-if="label"
            component="label"
            size="sm"
            :color="styles.label.color"
            :shade="styles.label.shade"
            weight="medium"
        >
            {{ label }}
        </Copy>

        <Input type="text" :value="value" @focus="onFocus" @blur="onBlur" />
    </Stack>
</template>

<script>
    import Copy from '@/components/Copy'
    import Input from '@/components/Input'
    import Stack from '@/components/Stack'

    export default {
        components: {
            Copy,
            Input,
            Stack,
        },

        props: {
            label: {
                type: String,
            },
            value: {
                type: String,
            },
        },

        data() {
            return {
                focused: false,
            }
        },

        computed: {
            styles() {
                return {
                    label: {
                        ...(this.focused
                            ? {
                                  color: 'indigo',
                                  shade: '700',
                              }
                            : {
                                  color: 'gray',
                                  shade: '600',
                              }),
                    },
                }
            },
        },

        methods: {
            onFocus() {
                this.focused = true
            },

            onBlur() {
                this.focused = false
            },
        },
    }
</script>
