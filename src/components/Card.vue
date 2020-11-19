<template>
    <Stack
        color="white"
        :borderWidth="2"
        borderColor="gray"
        borderShade="200"
        borderRadius="normal"
    >
        <slot />
    </Stack>
</template>

<script>
    import Stack from '@/components/Stack'

    export default {
        components: {
            Stack,
        },
    }
</script>
