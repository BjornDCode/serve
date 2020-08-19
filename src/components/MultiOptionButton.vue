<template>
    <div class="relative">
        <Button class="pr-12 py" @click="$emit('click', option)">
            <slot :option="option" />
        </Button>
        <Selectable
            :value="selectedKey"
            :options="options.map(option => option.key)"
            @select="onOptionSelect($event)"
            #default="{ open, highlighted, toggle, onSelect }"
        >
            <div>
                <button
                    type="button"
                    class="absolute right-0 top-0 bottom-0 rounded-r border-l-2 border-indigo-800 bg-indigo-700 w-8 flex justify-center items-center focus:outline-none focus:shadow-outline active:shadow-inner-lg"
                    aria-haspopup="listbox"
                    :aria-expanded="open"
                    @mouseup="toggle"
                >
                    <Icon name="cheveron-down" color="indigo" shade="100" />
                </button>
                <Dropdown v-if="open">
                    <SelectListItem
                        v-for="option in options"
                        :key="option.key"
                        :selected="option.key === selectedKey"
                        :highlighted="option.key === highlighted"
                        @click="onSelect(option.key)"
                    >
                        {{ option.title }}
                    </SelectListItem>
                </Dropdown>
            </div>
        </Selectable>
    </div>
</template>

<script>
    import Icon from '@/components/Icon'
    import Button from '@/components/Button'
    import Dropdown from '@/components/Dropdown'
    import Selectable from '@/compositions/Selectable'
    import SelectListItem from '@/components/SelectListItem'

    export default {
        components: {
            Icon,
            Button,
            Dropdown,
            Selectable,
            SelectListItem,
        },

        props: {
            options: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                selectedKey: this.options[0].key,
            }
        },

        computed: {
            option() {
                return this.options.find(
                    option => option.key === this.selectedKey
                )
            },
        },

        methods: {
            onOptionSelect(value) {
                this.selectedKey = value
            },
        },
    }
</script>
