<template>
    <div id="app" class="font-sans antialiased relative min-h-screen">
        <router-view />

        <Messages />

        <DockerStatus v-if="!dockerRunning" />
        <ModalContainer />
        <CommandContainer />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import Messages from '@/components/Messages'
    import DockerStatus from '@/components/DockerStatus'
    import ModalContainer from '@/components/ModalContainer'
    import CommandContainer from '@/components/CommandContainer'

    export default {
        components: {
            Messages,
            DockerStatus,
            ModalContainer,
            CommandContainer,
        },

        computed: {
            ...mapGetters({
                dockerRunning: 'app/dockerRunning',
            }),
        },
    }
</script>
