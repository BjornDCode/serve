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

        <Selectable
            :value="value"
            :options="options"
            #default="{ open, highlighted, toggle, onSelect }"
            @hide="focusButton"
            @select="onInput($event)"
        >
            <div class="relative w-full">
                <div class="relative w-full">
                    <Input
                        type="text"
                        class="pr-12 cursor-pointer"
                        readonly
                        tabindex="-1"
                        :value="value"
                        :focused="focused"
                        @click="toggle"
                        @focus.prevent="focusButton"
                    />

                    <button
                        type="button"
                        class="absolute right-0 top-0 bottom-0 rounded-r border-2 w-12 flex justify-center items-center focus:outline-none"
                        :class="{
                            'bg-indigo-100 border-indigo-700': focused,
                            'bg-gray-100 border-gray-300': !focused,
                        }"
                        @mouseup="toggle"
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
                <Dropdown v-if="open">
                    <SelectListItem
                        v-for="option in options"
                        :key="option"
                        :selected="option === value"
                        :highlighted="option === highlighted"
                        @click="onSelect(option)"
                    >
                        {{ option }}
                    </SelectListItem>
                </Dropdown>
            </div>
        </Selectable>
    </Stack>
</template>

<script>
    import Icon from '@/components/Icon'
    import Copy from '@/components/Copy'
    import Stack from '@/components/Stack'
    import Input from '@/components/Input'
    import Dropdown from '@/components/Dropdown'
    import Selectable from '@/compositions/Selectable'
    import SelectListItem from '@/components/SelectListItem'

    export default {
        components: {
            Icon,
            Copy,
            Stack,
            Input,
            Dropdown,
            Selectable,
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

        methods: {
            focusButton() {
                this.$refs.button.focus()
            },

            onFocus() {
                this.focused = true
            },

            onBlur() {
                this.focused = false
            },

            onInput(value) {
                this.$emit('input', value)
            },
        },
    }
</script>
