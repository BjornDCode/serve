<template>
    <Card>
        <Stack align="stretch" width="full" :spaceX="6" :spaceY="4" :space="4">
            <Inline justify="between">
                <Copy size="sm" color="gray" shade="600" weight="medium">
                    <Timestamp :data="timestamp" />
                </Copy>
                <LogLevel :level="level" />
            </Inline>
            <Stack>
                <ToggleableCodeOutput :text="body.message" :context="context" />
            </Stack>

            <Inline v-if="showActions" justify="between">
                <Button
                    v-if="body.stacktrace.length"
                    size="small"
                    variant="secondary"
                    @click="toggleStacktrace"
                >
                    <ConditionalText
                        :condition="showStacktrace"
                        true="Hide stacktrace"
                        false="Show stacktrace"
                    />
                </Button>
                <Button v-if="context" size="small" @click="openInEditor">
                    Open in Editor
                </Button>
            </Inline>

            <CodeOutput v-if="showStacktrace" :text="stacktraceOutput" />
        </Stack>
    </Card>
</template>

<script>
    import Copy from '@/components/Copy'
    import Card from '@/components/Card'
    import Stack from '@/components/Stack'
    import Button from '@/components/Button'
    import Inline from '@/components/Inline'
    import LogLevel from '@/components/LogLevel'
    import Timestamp from '@/components/Timestamp'
    import CodeOutput from '@/components/CodeOutput'
    import ConditionalText from '@/components/ConditionalText'
    import ToggleableCodeOutput from '@/components/ToggleableCodeOutput'

    export default {
        components: {
            Copy,
            Card,
            Stack,
            Button,
            Inline,
            LogLevel,
            Timestamp,
            CodeOutput,
            ConditionalText,
            ToggleableCodeOutput,
        },

        props: {
            timestamp: {
                type: String,
                required: true,
            },
            level: {
                type: String,
                required: true,
            },
            body: {
                type: Object,
                required: true,
            },
            projectPath: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                showStacktrace: false,
            }
        },

        computed: {
            context() {
                if (!this.body.file || !this.body.line) {
                    return null
                }

                return `${this.body.file}:${this.body.line}`
            },

            showActions() {
                return this.body.stacktrace.length && this.context
            },

            stacktraceOutput() {
                return this.body.stacktrace
                    .map(line => line.toString())
                    .join('\n')
            },
        },

        methods: {
            openInEditor() {
                this.$emit('launch', `${this.projectPath}/${this.context}`)
            },

            toggleStacktrace() {
                this.showStacktrace = !this.showStacktrace
            },
        },
    }
</script>
