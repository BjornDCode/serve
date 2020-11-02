<template>
    <Stack
        width="full"
        position="fixed"
        :left="0"
        :right="0"
        :bottom="0"
        color="white"
    >
        <Box
            :spaceX="8"
            :spaceY="4"
            width="full"
            :borderWidthT="2"
            borderColor="gray"
            borderShade="300"
        >
            <Inline justify="between" width="full" :space="4">
                <Inline>
                    <slot name="left" />
                </Inline>

                <Inline>
                    <slot />
                    <slot name="right" />
                </Inline>
            </Inline>
        </Box>
    </Stack>
</template>

<script>
    import Box from '@/components/Box'
    import Stack from '@/components/Stack'
    import Inline from '@/components/Inline'

    export default {
        components: {
            Box,
            Stack,
            Inline,
        },
    }
</script>
