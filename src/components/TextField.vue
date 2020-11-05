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

        <Input
            type="text"
            :value="value"
            :focused="focused"
            :error="hasError"
            v-bind="$attrs"
            @focus="onFocus"
            @blur="onBlur"
            @input="$emit('input', $event.target.value)"
        />

        <Copy v-if="hasError" size="sm" color="red" shade="600" weight="medium">
            {{ error }}
        </Copy>
    </Stack>
</template>

<script>
    import { match } from '@/helpers/methods'

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
            error: {
                type: String,
            },
        },

        data() {
            return {
                focused: false,
            }
        },

        computed: {
            hasError() {
                return !!(this.error && this.error.length)
            },

            styles() {
                const status = this.hasError
                    ? 'error'
                    : this.focused
                    ? 'focused'
                    : 'default'

                return {
                    label: match(status, {
                        error: {
                            color: 'red',
                            shade: '600',
                        },
                        focused: {
                            color: 'indigo',
                            shade: '700',
                        },
                        default: {
                            color: 'gray',
                            shade: '600',
                        },
                    }),
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
