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
        <GridItem v-if="loading" :start="4" :span="6">
            <Card>
                <Stack
                    align="stretch"
                    width="full"
                    :spaceX="6"
                    :spaceY="8"
                    :space="4"
                >
                    <Copy
                        color="gray"
                        shade="700"
                        size="sm"
                        align="center"
                        lineHeight="normal"
                    >
                        Fetching log...
                    </Copy>
                </Stack>
            </Card>
        </GridItem>
        <GridItem v-else-if="!exists" :start="4" :span="6">
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
        <GridItem v-else :start="3" :span="8">
            <Card v-if="log.entries.length === 0">
                <Stack
                    align="stretch"
                    width="full"
                    :spaceX="6"
                    :spaceY="8"
                    :space="4"
                >
                    <Copy
                        color="gray"
                        shade="700"
                        size="sm"
                        align="center"
                        lineHeight="normal"
                    >
                        No log entries
                    </Copy>
                </Stack>
            </Card>

            <Stack v-else width="full" align="stretch" :space="8">
                <LogEntry
                    v-for="(entry, i) in log.entries"
                    :key="i"
                    :project-path="projectPath"
                    v-bind="entry"
                    @launch="$emit('launch', $event)"
                />
            </Stack>
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
    import LogEntry from '@/components/LogEntry'
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
            LogEntry,
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
            loading: {
                type: Boolean,
                default: true,
            },
            exists: {
                type: Boolean,
                default: false,
            },
            log: {
                type: Object,
            },
            projectPath: {
                type: String,
                required: true,
            },
        },

        methods: {
            generate() {
                this.$emit('generate')
            },
        },
    }
</script>
