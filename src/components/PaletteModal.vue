<template>
    <ModalOverlay :spaceT="20" @close="$emit('close')">
        <Box :width="100">
            <slot />
        </Box>
    </ModalOverlay>
</template>

<script>
    import Box from '@/components/Box'
    import ModalOverlay from '@/components/ModalOverlay'

    export default {
        components: {
            Box,
            ModalOverlay,
        },
    }
</script>
