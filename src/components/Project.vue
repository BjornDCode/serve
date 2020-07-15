<template>
    <Box size="screen">
        <Box
            color="gray"
            shade="200"
            :spaceX="6"
            :spaceY="4"
            justify="between"
            align="center"
            width="full"
        >
            <Stack :space="2">
                <TextLink to="/">
                    <Icon name="cheveron-left" color="gray" shade="400" />
                    <Copy size="xs" color="gray" shade="500">Projects</Copy>
                </TextLink>

                <Headline>
                    {{ name }}
                </Headline>

                <Status :value="status" />
            </Stack>
            <Box>
                <Button :disabled="buttonDisabled">
                    {{ buttonText }}
                </Button>
            </Box>
        </Box>
    </Box>
</template>

<script>
    import Box from '@/components/Box'
    import Icon from '@/components/Icon'
    import Copy from '@/components/Copy'
    import Stack from '@/components/Stack'
    import Button from '@/components/Button'
    import Status from '@/components/Status'
    import TextLink from '@/components/TextLink'
    import Headline from '@/components/Headline'

    import { isValidStatus } from '@/config/validators'

    export default {
        components: {
            Box,
            Icon,
            Copy,
            Stack,
            Button,
            Status,
            TextLink,
            Headline,
        },

        props: {
            name: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                required: true,
                validator: isValidStatus,
            },
        },

        computed: {
            buttonText() {
                const lookup = {
                    running: 'Stop',
                    stopped: 'Start',
                    starting: 'Starting...',
                    stopping: 'Stopping...',
                }

                return lookup[this.status]
            },

            buttonDisabled() {
                return ['starting', 'stopping'].includes(this.status)
            },
        },
    }
</script>
