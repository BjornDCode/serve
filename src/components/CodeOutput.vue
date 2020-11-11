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
                <pre><code v-html="output" /></pre>
            </p>
            <button 
                v-if="showExpandButton" 
                class="absolute left-0 bottom-0 flex justify-center items-center w-full pb-5 pt-5 bg-gradient-to-b from-transparent to-gray-900 hover:to-gray-700"
                @click="expand" 
            >
                <Icon name="add-solid" color="pink" shade="400" />
            </button>
        </div>
    </Stack>
</template>

<script>
    import Box from '@/components/Box'
    import Copy from '@/components/Copy'
    import Icon from '@/components/Icon'
    import Stack from '@/components/Stack'

    export default {
        components: {
            Box,
            Copy,
            Icon,
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

        data() {
            return {
                expanded: false
            }
        },

        computed: {
            showExpandButton() {
                return this.lineCount > 3 && !this.expanded
            },

            lineCount() {
                return this.text.split('\n').length
            },

            output() {
                if (this.expanded) {
                    return this.text
                }

                return this.text.split('\n').filter((__, index) => index < 3).join('\n')
            }
        },

        methods: {
            expand() {
                this.expanded = true
            }
        }
    }
</script>
