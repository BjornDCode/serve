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
                    Ferrous
                </Headline>

                <Inline :space="2">
                    <Oval :size="3" color="green" shade="400" />
                    <Copy size="sm" color="gray" shade="700">Running</Copy>
                </Inline>
            </Stack>
            <Box>
                <Button>
                    Stop
                </Button>
            </Box>
        </Box>
    </Box>
</template>

<script>
    import Box from '@/components/Box'
    import Icon from '@/components/Icon'
    import Copy from '@/components/Copy'
    import Oval from '@/components/Oval'
    import Stack from '@/components/Stack'
    import Button from '@/components/Button'
    import Inline from '@/components/Inline'
    import TextLink from '@/components/TextLink'
    import Headline from '@/components/Headline'

    export default {
        components: {
            Box,
            Icon,
            Copy,
            Oval,
            Stack,
            Button,
            Inline,
            TextLink,
            Headline,
        },
    }
</script>
