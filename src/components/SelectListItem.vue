<template>
    <li role="option" :aria-selected="selected">
        <div
            class="bg-white px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-indigo-100"
            :class="{ 'bg-indigo-100': highlighted }"
            v-on="$listeners"
        >
            <Copy size="sm" weight="medium" color="gray" shade="700">
                <slot />
            </Copy>
            <Icon
                v-if="selected"
                name="checkmark"
                color="indigo"
                shade="600"
                :size="3"
            />
        </div>
    </li>
</template>

<script>
    import Icon from '@/components/Icon'
    import Copy from '@/components/Copy'

    export default {
        components: {
            Icon,
            Copy,
        },

        props: {
            selected: {
                type: Boolean,
                default: false,
            },
            highlighted: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>
