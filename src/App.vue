<template>
    <div id="app" class="font-sans antialiased relative">
        <router-view />

        <Messages />
    </div>
</template>

<script>
    import Messages from '@/components/Messages'

    export default {
        components: {
            Messages,
        },
    }
</script>
