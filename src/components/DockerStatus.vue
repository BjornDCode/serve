<template>
    <Box
        position="fixed"
        :top="0"
        :bottom="0"
        :left="0"
        :right="0"
        justify="center"
        align="center"
        color="indigo"
        shade="900"
        :backgroundOpacity="25"
    >
        <Stack
            color="white"
            width="2/5"
            borderRadius="normal"
            :spaceX="6"
            :spaceY="6"
        >
            <Copy
                align="center"
                lineHeight="snug"
                color="gray"
                shade="700"
                weight="medium"
            >
                Please make sure you have Docker running on your computer.
            </Copy>
        </Stack>
    </Box>
</template>

<script>
    import Box from '@/components/Box'
    import Copy from '@/components/Copy'
    import Stack from '@/components/Stack'

    export default {
        components: {
            Box,
            Copy,
            Stack,
        },
    }
</script>
