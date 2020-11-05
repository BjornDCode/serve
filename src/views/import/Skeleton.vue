<template>
    <Box
        justify="center"
        minHeight="screen"
        color="gray"
        shade="100"
        :spaceY="12"
    >
        <Stack :width="80">
            <slot />
        </Stack>

        <footer>
            <slot name="footer" />
        </footer>
    </Box>
</template>

<script>
    import Box from '@/components/Box'
    import Stack from '@/components/Stack'

    export default {
        components: {
            Box,
            Stack,
        },
    }
</script>
