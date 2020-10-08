<template>
    <InfoModal @close="$emit('close')">
        <Headline :level="2">
            Application shortcuts
        </Headline>
    </InfoModal>
</template>

<script>
    import Headline from '@/components/Headline'
    import InfoModal from '@/components/InfoModal'

    export default {
        components: {
            Headline,
            InfoModal,
        },
    }
</script>
