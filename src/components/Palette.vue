<template>
    <Stack v-bind="$attrs" shadow="md" borderRadius="normal" overflow="hidden">
        <input
            class="block w-full px-6 py-3 font-medium text-gray-600 text-sm focus:outline-none"
            v-model="query"
            ref="input"
            @keydown.tab.prevent
            @keydown.down.prevent="next"
            @keydown.up.prevent="previous"
            @keydown.enter="execute"
        />

        <ul class="w-full">
            <li v-for="(option, index) in filteredOptions" :key="option.key">
                <PaletteOption
                    :selected="index === selected"
                    :value="option.display"
                    :query="query"
                    @click="click(index)"
                />
            </li>
        </ul>
    </Stack>
</template>

<script>
    import Stack from '@/components/Stack'
    import PaletteOption from '@/components/PaletteOption'

    export default {
        components: {
            Stack,
            PaletteOption,
        },

        props: {
            options: {
                type: Array,
                default: () => [],
            },
            project: {
                type: Object,
            },
        },

        data() {
            return {
                query: '',
                selected: 0,
            }
        },

        computed: {
            filteredOptions() {
                return (
                    this.options
                        .map(option => ({
                            ...option,
                            display: option.category
                                ? `${option.category}: ${option.label}`
                                : option.label,
                        }))
                        // Filter by query
                        .filter(option =>
                            option.display
                                .toLowerCase()
                                .includes(this.query.toLowerCase()),
                        )
                        // Show max 7 items
                        .filter((__, index) => index < 7)
                )
            },
        },

        mounted() {
            this.$refs.input.focus()
        },

        methods: {
            previous() {
                if (this.selected === 0) {
                    this.selected = this.filteredOptions.length - 1
                    return
                }

                this.selected--
            },

            next() {
                if (this.selected === this.filteredOptions.length - 1) {
                    this.selected = 0
                    return
                }

                this.selected++
            },

            execute() {
                this.$emit(
                    'execute',
                    this.filteredOptions.find(
                        (__, index) => index === this.selected,
                    ),
                )
            },

            click(i) {
                this.$emit(
                    'execute',
                    this.filteredOptions.find((__, index) => index === i),
                )
            },
        },
    }
</script>
