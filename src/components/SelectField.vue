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
            <div class="relative w-full">
                <Input
                    type="text"
                    class="pr-12 cursor-pointer"
                    readonly
                    tabindex="-1"
                    :value="value"
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
                    @mouseup="onClick"
                    @focus="onFocus"
                    @blur="onBlur"
                    ref="button"
                    aria-haspopup="listbox"
                    :aria-expanded="open"
                >
                    <Icon
                        name="cheveron-down"
                        :color="styles.button.color"
                        :shade="styles.button.shade"
                    />
                </button>
            </div>
            <div class="absolute w-full z-20" v-if="open">
                <ul
                    class="max-h-56 overflow-scroll border-b-2 border-l-2 border-r-2 border-gray-300"
                    role="listbox"
                >
                    <SelectListItem
                        v-for="option in options"
                        :key="option"
                        :selected="option === value"
                        :highlighted="option === highlighted"
                        @click="onSelect(option)"
                    >
                        {{ option }}
                    </SelectListItem>
                </ul>
            </div>
        </div>
    </Stack>
</template>

<script>
    import tinykeys from 'tinykeys'

    import Icon from '@/components/Icon'
    import Copy from '@/components/Copy'
    import Stack from '@/components/Stack'
    import Input from '@/components/Input'
    import SelectListItem from '@/components/SelectListItem'

    export default {
        components: {
            Icon,
            Copy,
            Stack,
            Input,
            SelectListItem,
        },

        props: {
            value: {},
            label: {
                type: String,
            },
            options: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                open: false,
                focused: false,
                highlighted: this.value,
                removeKeyBindings: null,
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
            // "tinykeys" returns a function that removes the listeners
            this.removeKeyBindings = tinykeys(window, {
                ArrowDown: this.handleArrowDown,
                ArrowUp: this.handleArrowUp,
                Enter: this.handleEnter,
                Space: this.handleEnter,
                Escape: this.handleEscape,
                Home: this.handleHome,
                End: this.handleEnd,
            })

            window.addEventListener('click', this.handleOutsideClick)
        },

        beforeDestroy() {
            this.removeKeyBindings()

            window.removeEventListener('click', this.handleOutsideClick)
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

            onSelect(value) {
                this.$emit('input', value)

                this.hide()
            },

            onClick() {
                this.toggle()
            },

            toggle() {
                this.open = !this.open

                this.resetHighlighted()
            },

            show() {
                this.open = true

                this.resetHighlighted()
            },

            hide() {
                this.open = false

                this.$refs.button.focus()
            },

            handleOutsideClick(event) {
                if (this.$el.contains(event.target)) {
                    return
                }

                if (!this.open) {
                    return
                }

                // Don't call hide() because that will cause the button to receive focus
                this.open = false
            },

            handleEnter() {
                if (!this.open) {
                    return this.show()
                }

                this.onSelect(this.highlighted)
            },

            handleEscape() {
                if (!this.open) {
                    return
                }

                this.hide()
            },

            handleHome() {
                if (!this.open) {
                    return
                }

                this.setHighlighted(this.options[0])
            },

            handleEnd() {
                if (!this.open) {
                    return
                }

                this.setHighlighted(this.options[this.options.length - 1])
            },

            handleArrowDown(event) {
                if (!this.open) {
                    return
                }

                event.preventDefault()

                this.nextHighlighted()
            },

            handleArrowUp(event) {
                if (!this.open) {
                    return
                }

                event.preventDefault()

                this.previousHighlighted()
            },

            resetHighlighted() {
                this.highlighted = this.value
            },

            setHighlighted(value) {
                this.highlighted = value
            },

            nextHighlighted() {
                const highlightedIndex = this.options.findIndex(
                    option => option === this.highlighted
                )

                const nextIndex = (highlightedIndex + 1) % this.options.length

                this.setHighlighted(this.options[nextIndex])
            },

            previousHighlighted() {
                const highlightedIndex = this.options.findIndex(
                    option => option === this.highlighted
                )

                const nextIndex =
                    highlightedIndex - 1 < 0
                        ? this.options.length - 1
                        : highlightedIndex - 1

                this.setHighlighted(this.options[nextIndex])
            },
        },
    }
</script>
