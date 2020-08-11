<template>
    <Stack expand height="full">
        <Stack
            component="Box"
            :space="16"
            :spaceX="8"
            :spaceY="6"
            width="full"
            expand
        >
            <Inline width="full" :space="8" align="start">
                <Box width="1/3">
                    <Stack :space="1">
                        <Headline :level="2">
                            Project
                        </Headline>
                        <Copy component="p" color="gray" shade="700">
                            Meta information about the project.
                        </Copy>
                    </Stack>
                </Box>
                <Stack component="Box" align="stretch" width="2/5" :space="8">
                    <TextField
                        label="Name"
                        :value="values.project"
                        @input="onInput('project', $event)"
                    />
                    <PathField
                        label="Path"
                        :value="values.path"
                        @input="onInput('path', $event)"
                    />
                </Stack>
            </Inline>

            <Inline width="full" :space="8" align="start">
                <Box width="1/3">
                    <Stack :space="1">
                        <Headline :level="2">
                            PHP
                        </Headline>
                        <Copy component="p" color="gray" shade="700">
                            All settings related to PHP.
                        </Copy>
                    </Stack>
                </Box>
                <Stack component="Box" align="stretch" width="2/5" :space="8">
                    <SelectField
                        label="Version"
                        :options="['7.4', '7.3', '7.2']"
                        :value="values.php.version"
                        @input="onInput('php.version', $event)"
                    />
                </Stack>
            </Inline>

            <Inline width="full" :space="8" align="start">
                <Box width="1/3">
                    <Stack :space="1">
                        <Headline :level="2">
                            Node
                        </Headline>
                        <Copy component="p" color="gray" shade="700">
                            All settings related to Node.
                        </Copy>
                    </Stack>
                </Box>
                <Stack component="Box" align="stretch" width="2/5" :space="8">
                    <SelectField
                        label="Version"
                        :options="['14', '12', '10']"
                        :value="values.node.version"
                        @input="onInput('node.version', $event)"
                    />
                </Stack>
            </Inline>

            <Inline width="full" :space="8" align="start">
                <Box width="1/3">
                    <Stack :space="1">
                        <Headline :level="2">
                            Redis
                        </Headline>
                        <Copy component="p" color="gray" shade="700">
                            All settings related to Redis.
                        </Copy>
                    </Stack>
                </Box>
                <Stack component="Box" align="stretch" width="2/5" :space="8">
                    <SelectField
                        label="Version"
                        :options="['6', '5']"
                        :value="values.redis.version"
                        @input="onInput('redis.version', $event)"
                    />
                </Stack>
            </Inline>

            <Inline width="full" :space="8" align="start">
                <Box width="1/3">
                    <Stack :space="1">
                        <Headline :level="2">
                            Database
                        </Headline>
                        <Copy component="p" color="gray" shade="700">
                            All settings related to your database.
                        </Copy>
                    </Stack>
                </Box>
                <Stack component="Box" align="stretch" width="2/5" :space="8">
                    <SelectField
                        label="Type"
                        :options="['mysql', 'postgres']"
                        :value="values.database.type"
                        @input="onInput('database.type', $event)"
                    />
                    <SelectField
                        label="Version"
                        :options="databaseVersionOptions"
                        :value="values.database.version"
                        @input="onInput('database.version', $event)"
                    />
                </Stack>
            </Inline>
        </Stack>

        <Stack width="full">
            <Box color="gray" shade="300" width="full" height="2px" />
            <Box :spaceX="8" :spaceY="4" width="full">
                <Inline justify="end" width="full" :space="4">
                    <Button
                        variant="secondary"
                        @click="onCancel"
                        :disabled="!dirty"
                    >
                        Cancel
                    </Button>
                    <Button @click="onSave" :disabled="!dirty">
                        Save
                    </Button>
                </Inline>
            </Box>
        </Stack>
    </Stack>
</template>

<script>
    import Box from '@/components/Box'
    import Copy from '@/components/Copy'
    import Stack from '@/components/Stack'
    import Button from '@/components/Button'
    import Inline from '@/components/Inline'
    import Headline from '@/components/Headline'
    import TextField from '@/components/TextField'
    import PathField from '@/components/PathField'
    import SelectField from '@/components/SelectField'

    export default {
        components: {
            Box,
            Copy,
            Stack,
            Button,
            Inline,
            Headline,
            TextField,
            PathField,
            SelectField,
        },

        computed: {
            databaseVersionOptions() {
                const lookup = {
                    mysql: ['8', '5.7', '5.6'],
                    postgres: ['13', '12', '11', '10', '9.5', '9'],
                }

                return lookup[this.values.database.type] || []
            },
        },

        props: {
            values: {
                type: Object,
                required: true,
            },
            dirty: {
                type: Boolean,
                default: false,
            },
            onInput: {
                type: Function,
                default: () => {},
            },
            onSave: {
                type: Function,
                default: () => {},
            },
            onCancel: {
                type: Function,
                default: () => {},
            },
        },

        watch: {
            'values.database.type': function (value, oldValue) {
                if (value === oldValue) {
                    return
                }

                const lookup = {
                    mysql: '5.7',
                    postgres: '12',
                }

                this.onInput('database.version', lookup[value])
            },
        },
    }
</script>
