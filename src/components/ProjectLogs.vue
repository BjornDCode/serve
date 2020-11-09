<template>
    <Grid
        :columns="12"
        :gap="8"
        :space="16"
        :spaceX="8"
        :spaceT="8"
        :spaceB="20"
        expand
        color="gray"
        shade="100"
    >
        <GridItem v-if="!exists" :start="4" :span="6">
            <Card>
                <Stack align="stretch" :spaceX="6" :spaceY="8" :space="4">
                    <Headline :level="4" align="center"
                        >No log file found</Headline
                    >
                    <Copy
                        color="gray"
                        shade="700"
                        size="sm"
                        align="center"
                        lineHeight="normal"
                    >
                        Serve couldn't find the log file at
                        <InlineCode>{{ path }}</InlineCode
                        >. If the log file is located somewhere else you can
                        update the path in settings.
                    </Copy>
                    <Inline justify="center" :space="4">
                        <Button
                            component="router-link"
                            :to="{
                                name: 'project.settings',
                                params: { id: id },
                            }"
                            variant="secondary"
                        >
                            Settings
                        </Button>
                        <Button @click="generate">
                            Generate log file
                        </Button>
                    </Inline>
                </Stack>
            </Card>
        </GridItem>
    </Grid>
</template>

<script>
    import Copy from '@/components/Copy'
    import Card from '@/components/Card'
    import Grid from '@/components/Grid'
    import Stack from '@/components/Stack'
    import Button from '@/components/Button'
    import Inline from '@/components/Inline'
    import Headline from '@/components/Headline'
    import GridItem from '@/components/GridItem'
    import InlineCode from '@/components/InlineCode'

    export default {
        components: {
            Copy,
            Card,
            Grid,
            Stack,
            Button,
            Inline,
            Headline,
            GridItem,
            InlineCode,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
            exists: {
                type: Boolean,
                default: false,
            },
        },

        methods: {
            generate() {
                this.$emit('generate')
            },
        },
    }
</script>
