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

        <div class="relative w-full">
            <Input
                type="text"
                class="pr-12 cursor-pointer"
                readonly
                tabindex="-1"
                :value="displayValue"
                :focused="focused"
                @click="onClick"
                @focus.prevent="onInputFocus"
            />
            <button
                type="button"
                class="absolute right-0 top-0 bottom-0 rounded-r border-2 w-12 flex justify-center items-center focus:outline-none"
                :class="{
                    'bg-indigo-100 border-indigo-700': focused,
                    'bg-gray-100 border-gray-300': !focused,
                }"
                @click="onClick"
                @focus="onFocus"
                @blur="onBlur"
                ref="button"
            >
                <Icon
                    name="folder"
                    :color="styles.button.color"
                    :shade="styles.button.shade"
                />
            </button>
        </div>
    </Stack>
</template>

<script>
    import { v4 as uuid } from 'uuid'

    import Icon from '@/components/Icon'
    import Copy from '@/components/Copy'
    import Input from '@/components/Input'
    import Stack from '@/components/Stack'

    export default {
        components: {
            Icon,
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
                id: uuid(),
                focused: false,
            }
        },

        computed: {
            displayValue() {
                if (!this.value) {
                    return ''
                }

                const folder = this.value.split('/').pop()

                return `../${folder}`
            },

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
                    button: {
                        ...(this.focused
                            ? {
                                  color: 'indigo',
                                  shade: '600',
                              }
                            : {
                                  color: 'gray',
                                  shade: '500',
                              }),
                    },
                }
            },
        },

        mounted() {
            // Drag events
            this.$el.addEventListener('dragover', this.onDragOver)
            this.$el.addEventListener('dragenter', this.onDragEnter)
            this.$el.addEventListener('dragleave', this.onDragLeave)
            this.$el.addEventListener('drop', this.onDrop)
        },

        beforeDestroy() {
            this.$el.removeEventListener('dragover', this.onDragOver)
            this.$el.removeEventListener('dragenter', this.onDragEnter)
            this.$el.removeEventListener('dragleave', this.onDragLeave)
            this.$el.removeEventListener('drop', this.onDrop)
        },

        methods: {
            onInputFocus() {
                this.$refs.button.focus()
            },

            onFocus() {
                this.focused = true
            },

            onBlur() {
                this.focused = false
            },

            onClick() {
                window.ipc
                    .invoke('launch', {
                        id: this.id,
                        type: 'dialog',
                    })
                    .then(response => {
                        if (!response) {
                            return
                        }

                        this.onInput(response.value)
                    })
            },

            onInput(folder) {
                this.$emit('input', folder)
            },

            onDragOver(event) {
                event.preventDefault()
            },

            onDragEnter(event) {
                event.preventDefault()
                this.onFocus()
            },

            onDragLeave(event) {
                event.preventDefault()
                this.onBlur()
            },

            onDrop(event) {
                event.stopPropagation()
                event.preventDefault()

                const files = event.dataTransfer.files

                if (files.length < 1) {
                    return
                }

                this.onInput(files[0].path)
                this.onBlur()
            },
        },
    }
</script>
