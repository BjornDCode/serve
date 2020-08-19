<template>
    <Inline :space="2">
        <Oval
            :size="3"
            :color="styles.indicator.color"
            :shade="styles.indicator.shade"
        />
        <Copy size="sm" color="gray" shade="700" capitalised>
            {{ value }}
        </Copy>
    </Inline>
</template>

<script>
    import { match } from '@/helpers/methods'
    import { isValidStatus } from '@/config/validators'

    import Copy from '@/components/Copy'
    import Oval from '@/components/Oval'
    import Inline from '@/components/Inline'

    export default {
        components: {
            Copy,
            Oval,
            Inline,
        },

        props: {
            value: {
                type: String,
                required: true,
                validator: isValidStatus,
            },
        },

        computed: {
            styles() {
                return {
                    indicator: {
                        ...match(this.value, {
                            running: {
                                color: 'green',
                                shade: '400',
                            },
                            stopped: {
                                color: 'red',
                                shade: '500',
                            },
                            starting: {
                                color: 'yellow',
                                shade: '500',
                            },
                            stopping: {
                                color: 'yellow',
                                shade: '500',
                            },
                        }),
                    },
                }
            },
        },
    }
</script>
