<template>
    <div id="app" class="font-sans antialiased relative min-h-screen">
        <router-view />

        <Messages />

        <DockerStatus v-if="!dockerRunning" />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import Messages from '@/components/Messages'
    import DockerStatus from '@/components/DockerStatus'

    export default {
        components: {
            Messages,
            DockerStatus,
        },

        computed: {
            ...mapGetters({
                dockerRunning: 'app/dockerRunning',
            }),
        },
    }
</script>
