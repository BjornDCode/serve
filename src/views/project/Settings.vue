<template>
    <Box width="full">
        <Inline width="full" :space="8" align="start">
            <Box width="1/3">
                <Stack :space="1">
                    <Headline :level="2">
                        Project
                    </Headline>
                    <Copy component="p" color="gray" shade="700">
                        Meta information about the project
                    </Copy>
                </Stack>
            </Box>
            <Stack component="Box" align="stretch" width="2/5" :space="8">
                <TextField label="Name" :value="project" />
                <TextField label="Path" :value="path" />
            </Stack>
        </Inline>
    </Box>
</template>

<script>
    import Box from '@/components/Box'
    import Copy from '@/components/Copy'
    import Stack from '@/components/Stack'
    import Inline from '@/components/Inline'
    import Headline from '@/components/Headline'
    import TextField from '@/components/TextField'

    export default {
        components: {
            Box,
            Copy,
            Stack,
            Inline,
            Headline,
            TextField,
        },

        props: {
            project: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
        },
    }
</script>
