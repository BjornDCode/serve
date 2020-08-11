<template>
    <div class="fixed inset-x-0 bottom-0 flex justify-center mb-4">
        <Stack
            component="transition-group"
            tag="ul"
            :space="4"
            align="center"
            name="message"
        >
            <li v-for="message in messages" :key="message.id">
                <Message v-bind="message" @remove="removeMessage(message.id)">
                    {{ message.content }}
                </Message>
            </li>
        </Stack>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import Stack from '@/components/Stack'
    import Message from '@/components/Message'

    export default {
        components: {
            Stack,
            Message,
        },

        computed: {
            ...mapGetters({ messages: 'messages/all' }),
        },

        methods: {
            ...mapActions({
                removeMessage: 'messages/remove',
            }),
        },
    }
</script>

<style>
    .message-enter-active,
    .message-leave-active {
        @apply transition duration-200 ease-out;
    }
    .message-enter,
    .message-leave-to {
        @apply transform translate-y-4 opacity-0;
    }

    .message-move {
        @apply transition duration-200;
    }
</style>
