<template>
    <button @click="execute" class="focus:outline-none focus:shadow-outline">
        <slot />
    </button>
</template>

<script>
    export default {
        props: {
            target: {
                type: String,
                default: 'browser',
                validator: value => ['browser', 'filesystem'].includes(value),
            },
            path: {
                type: String,
                required: true,
            },
        },

        methods: {
            execute() {
                window.ipc.send('launch', {
                    type: this.target,
                    path: this.path,
                })
            },
        },
    }
</script>
