<template>
    <Stack width="full">
        <Box
            v-if="context"
            color="gray"
            shade="100"
            :spaceX="6"
            :spaceY="3"
            borderColor="gray"
            borderShade="200"
            width="full"
            class="border-l-2 border-t-2 border-r-2 rounded-t"
        >
            <Copy size="sm" color="gray" shade="600" class="truncate-beginning">
                {{ context }}
            </Copy>
        </Box>
        <div 
            class="bg-gray-800 px-6 py-6 overflow-x-auto w-full relative"
            :class="{ 'rounded': !context }"
        >
            <p class="block w-full font-mono text-white text-sm font-medium">
                <pre><code v-html="text" /></pre>
            </p>

            <slot name="overlay" />
        </div>
    </Stack>
</template>

<script>
    import Box from '@/components/Box'
    import Copy from '@/components/Copy'
    import Stack from '@/components/Stack'

    export default {
        components: {
            Box,
            Copy,
            Stack,
        },

        props: {
            text: {
                type: String,
                required: true,
            },
            context: {
                type: String,
            },
        },

    }
</script>
