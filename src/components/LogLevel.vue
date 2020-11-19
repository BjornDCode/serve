<template>
    <Box
        :color="styles.background.color"
        :shade="styles.background.shade"
        :spaceY="1"
        :spaceX="1"
        borderRadius="sm"
    >
        <Copy
            size="xs"
            :color="styles.text.color"
            :shade="styles.text.shade"
            weight="medium"
            transform="uppercase"
            class="tracking-tight"
        >
            {{ level }}
        </Copy>
    </Box>
</template>

<script>
    import { match } from '@/helpers/methods'

    import Box from '@/components/Box'
    import Copy from '@/components/Copy'

    export default {
        components: {
            Box,
            Copy,
        },

        props: {
            level: {
                type: String,
                required: true,
                validator: level =>
                    [
                        'emergency',
                        'alert',
                        'critical',
                        'error',
                        'warning',
                        'notice',
                        'info',
                        'debug',
                    ].includes(level),
            },
        },

        computed: {
            styles() {
                return match(this.level, {
                    emergency: {
                        background: {
                            color: 'red',
                            shade: '300',
                        },
                        text: {
                            color: 'red',
                            shade: '900',
                        },
                    },
                    alert: {
                        background: {
                            color: 'red',
                            shade: '300',
                        },
                        text: {
                            color: 'red',
                            shade: '900',
                        },
                    },
                    critical: {
                        background: {
                            color: 'red',
                            shade: '300',
                        },
                        text: {
                            color: 'red',
                            shade: '900',
                        },
                    },
                    error: {
                        background: {
                            color: 'red',
                            shade: '300',
                        },
                        text: {
                            color: 'red',
                            shade: '900',
                        },
                    },
                    warning: {
                        background: {
                            color: 'orange',
                            shade: '300',
                        },
                        text: {
                            color: 'orange',
                            shade: '900',
                        },
                    },
                    notice: {
                        background: {
                            color: 'yellow',
                            shade: '300',
                        },
                        text: {
                            color: 'yellow',
                            shade: '900',
                        },
                    },
                    info: {
                        background: {
                            color: 'green',
                            shade: '300',
                        },
                        text: {
                            color: 'green',
                            shade: '900',
                        },
                    },
                    debug: {
                        background: {
                            color: 'blue',
                            shade: '300',
                        },
                        text: {
                            color: 'blue',
                            shade: '900',
                        },
                    },
                })
            },
        },
    }
</script>
