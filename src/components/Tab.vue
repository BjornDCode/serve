<template>
    <ListItem>
        <TextLink :to="to">
            <Box :spaceT="3" :spaceB="2">
                <Stack :space="2">
                    <Copy size="sm" :color="color" shade="700" weight="medium">
                        <slot />
                    </Copy>

                    <Box
                        width="full"
                        :height="1"
                        :color="styles.border.color"
                        :shade="styles.border.shade"
                    />
                </Stack>
            </Box>
        </TextLink>
    </ListItem>
</template>

<script>
    import Box from '@/components/Box'
    import Copy from '@/components/Copy'
    import Stack from '@/components/Stack'
    import ListItem from '@/components/ListItem'
    import TextLink from '@/components/TextLink'

    export default {
        components: {
            Box,
            Copy,
            Stack,
            ListItem,
            TextLink,
        },

        props: {
            to: {
                type: [String, Object],
                required: true,
            },
            active: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            color() {
                return this.active ? 'indigo' : 'gray'
            },

            styles() {
                return {
                    border: {
                        ...(this.active
                            ? {
                                  color: 'indigo',
                                  shade: '700',
                              }
                            : {
                                  color: 'white',
                              }),
                    },
                }
            },
        },
    }
</script>
