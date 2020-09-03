<template>
    <Stack expand height="full">
        <Stack
            :space="16"
            :spaceX="8"
            :spaceT="6"
            :spaceB="20"
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
                <Stack align="stretch" width="2/5" :space="8">
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
                            Server
                        </Headline>
                        <Copy component="p" color="gray" shade="700">
                            All settings related to the web server.
                        </Copy>
                    </Stack>
                </Box>
                <Stack align="stretch" width="2/5" :space="8">
                    <TextField
                        label="Port"
                        :value="values.server.port"
                        @input="onInput('server.port', $event)"
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
                <Stack align="stretch" width="2/5" :space="8">
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
                <Stack align="stretch" width="2/5" :space="8">
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
                <Stack align="stretch" width="2/5" :space="8">
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
                <Stack align="stretch" width="2/5" :space="8">
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

        <Stack
            width="full"
            position="fixed"
            :left="0"
            :right="0"
            :bottom="0"
            color="white"
        >
            <Box
                :spaceX="8"
                :spaceY="4"
                width="full"
                :borderWidthT="2"
                borderColor="gray"
                borderShade="300"
            >
                <Inline justify="end" width="full" :space="4">
                    <Button
                        component="router-link"
                        :to="{ name: 'home' }"
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                    <Button @click="onSave" :disabled="!valid">
                        Import
                    </Button>
                </Inline>
            </Box>
        </Stack>
    </Stack>
</template>

<script>
    import { v4 as uuid } from 'uuid'
    import { mapActions } from 'vuex'
    import toml from '@iarna/toml'
    import set from 'lodash/set'
    import cloneDeep from 'lodash/cloneDeep'

    import { match } from '@/helpers/methods'

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

        data() {
            return {
                values: {
                    id: uuid(),
                    path: '',
                    repository: null,
                    status: null,
                    php: {
                        version: '7.4',
                    },
                    node: {
                        version: '12',
                    },
                    redis: {
                        version: '6',
                    },
                    database: {
                        type: 'mysql',
                        version: '5.7',
                    },
                    server: {
                        port: '8081',
                    },
                },
            }
        },

        computed: {
            databaseVersionOptions() {
                return match(this.values.database.type, {
                    mysql: ['8', '5.7', '5.6'],
                    postgres: ['13', '12', '11', '10', '9.5', '9'],
                    default: [],
                })
            },

            valid() {
                return this.values.path.length
            },
        },

        methods: {
            ...mapActions({
                createProject: 'projects/create',
            }),

            onInput(key, value) {
                this.values = { ...set(cloneDeep(this.values), key, value) }
            },

            onSave() {
                this.createProject(this.values)
                this.$router.push({
                    name: 'home',
                })
            },
        },

        mounted() {
            window.ipc.receive('filesystem', response => {
                if (response.type !== 'read') {
                    return
                }

                if (response.id !== this.values.id) {
                    return
                }

                const config = cloneDeep(toml.parse(response.value))

                this.values = {
                    ...this.values,
                    ...config,
                }
            })

            window.ipc.receive('filesystem', response => {
                if (response.type !== 'exists') {
                    return
                }

                if (response.id !== this.values.id) {
                    return
                }

                // 'response.value' contains a boolean indicating whether the file exists or not
                if (!response.value) {
                    return
                }

                window.ipc.send('filesystem', {
                    id: this.values.id,
                    type: 'read',
                    path: `${this.values.path}/serve.toml`,
                })
            })
        },

        watch: {
            'values.path': function (value) {
                window.ipc.send('filesystem', {
                    id: this.values.id,
                    type: 'exists',
                    path: `${value}/serve.toml`,
                })
            },

            'values.database.type': function (value, oldValue) {
                if (value === oldValue) {
                    return
                }

                this.onInput('database.version', match(value), {
                    mysql: '5.7',
                    postgres: '12',
                })
            },
        },
    }
</script>
