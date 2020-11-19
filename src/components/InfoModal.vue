<template>
    <ModalOverlay :spaceY="20" @close="$emit('close')">
        <Stack
            color="white"
            width="3/5"
            :spaceX="8"
            :spaceY="8"
            borderRadius="normal"
        >
            <slot />
        </Stack>
    </ModalOverlay>
</template>

<script>
    import Stack from '@/components/Stack'
    import ModalOverlay from '@/components/ModalOverlay'

    export default {
        components: {
            Stack,
            ModalOverlay,
        },
    }
</script>
