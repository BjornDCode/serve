<template>
    <div id="app" class="font-sans antialiased">
        <router-view />
    </div>
</template>

<script>
    export default {
        mounted() {
            window.ipc.receive('command-executed', data => {
                console.log('feedback', data)
            })
        },
    }
</script>
