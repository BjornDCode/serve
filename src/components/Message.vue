<template>
    <Inline
        color="gray"
        shade="800"
        borderRadius="normal"
        :maxWidth="64"
        shadow="lg"
        :spaceX="2"
        :spaceY="2"
        :space="2"
        align="start"
        @click="remove"
    >
        <Icon
            :name="icon"
            :color="styles.icon.color"
            :shade="styles.icon.shade"
            :size="3"
            class="flex-shrink-0"
            >{{ type }}</Icon
        >

        <Copy size="xs" color="white" weight="semibold">
            <slot />
        </Copy>
    </Inline>
</template>

<script>
    import { match } from '@/helpers/methods'

    import Copy from '@/components/Copy'
    import Icon from '@/components/Icon'
    import Inline from '@/components/Inline'

    export default {
        components: {
            Copy,
            Icon,
            Inline,
        },

        props: {
            type: {
                type: String,
                required: true,
                validator: value => ['success', 'error'].includes(value),
            },
            expires: {
                type: Number,
            },
        },

        computed: {
            icon() {
                return match(this.type, {
                    success: 'checkmark-outline',
                    error: 'close-outline',
                })
            },

            styles() {
                const icon = {
                    success: {
                        color: 'green',
                        shade: '300',
                    },
                    error: {
                        color: 'red',
                        shade: '300',
                    },
                }

                return {
                    icon: icon[this.type],
                }
            },
        },

        mounted() {
            if (this.expires) {
                setTimeout(() => {
                    this.remove()
                }, this.expires)
            }
        },

        methods: {
            remove() {
                this.$emit('remove')
            },
        },
    }
</script>
