<template>
    <Oval
        :size="3"
        :color="styles.indicator.color"
        :shade="styles.indicator.shade"
    />
</template>

<script>
    import { match } from '@/helpers/methods'
    import { isValidStatus } from '@/config/validators'

    import Oval from '@/components/Oval'

    export default {
        components: {
            Oval,
        },

        props: {
            value: {
                type: String,
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
                            creating: {
                                color: 'teal',
                                shade: '200',
                            },
                            default: {
                                color: 'gray',
                                shade: '300',
                            },
                        }),
                    },
                }
            },
        },
    }
</script>
