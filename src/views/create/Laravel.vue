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
                        :value="temporary.path"
                        @input="onInput('path', $event, 'temporary')"
                    />
                    <TextField
                        label="Name"
                        :value="temporary.name"
                        @input="onInput('name', $event, 'temporary')"
                        :error="errors.path"
                    />
                    <Copy v-if="valid" size="xs" color="gray" shade="700">
                        The project will be located at: {{ project.path }}
                    </Copy>
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
                        :value="project.server.port"
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
                        :options="['8.0-rc3', '7.4', '7.3']"
                        :value="project.php.version"
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
                        :value="project.node.version"
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
                        :value="project.redis.version"
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
                        :value="project.database.type"
                        @input="onInput('database.type', $event)"
                    />
                    <SelectField
                        label="Version"
                        :options="databaseVersionOptions"
                        :value="project.database.version"
                        @input="onInput('database.version', $event)"
                    />
                    <TextField
                        label="Port"
                        :value="project.database.port"
                        @input="onInput('database.port', $event)"
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
                    <Button @click="onSave" :disabled="!submittable">
                        Create
                    </Button>
                </Inline>
            </Box>
        </Stack>
    </Stack>
</template>

<script>
    import { v4 as uuid } from 'uuid'
    import { mapActions } from 'vuex'
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
            Inline,
            Button,
            Headline,
            TextField,
            PathField,
            SelectField,
        },

        data() {
            return {
                temporary: {
                    name: '',
                    path: '',
                },
                project: {
                    id: uuid(),
                    last_used: Date.now(),
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
                        port: '3306',
                    },
                    server: {
                        port: '8081',
                    },
                    logs: {
                        path: 'storage/logs/laravel.log',
                    },
                },
                errors: {
                    path: '',
                },
            }
        },

        computed: {
            databaseVersionOptions() {
                return match(this.project.database.type, {
                    mysql: ['8', '5.7', '5.6'],
                    postgres: ['13', '12', '11', '10', '9.5', '9'],
                    default: [],
                })
            },

            valid() {
                return !!(
                    this.temporary.path.length && this.temporary.name.length
                )
            },

            submittable() {
                return this.valid && this.errors.path.length < 1
            },
        },

        methods: {
            ...mapActions({
                createProject: 'projects/create',
                updateProjectSetting: 'projects/updateSetting',
            }),

            onInput(key, value, values = 'project') {
                this[values] = {
                    ...set(cloneDeep(this[values]), key, value),
                }
            },

            onSave() {
                this.createProject({ ...this.project, status: 'creating' })

                window.ipc
                    .invoke('docker', {
                        type: 'run',
                        path: this.temporary.path,
                        value: `
                        docker run --rm --interactive \
                        --volume $PWD:/app \
                        composer /bin/sh -c "composer create-project --prefer-dist laravel/laravel ${this.temporary.name} && composer require predis/predis -d ${this.temporary.name}"
                    `,
                    })
                    .then(() => {
                        new Notification('Project created!', {
                            body: `${this.temporary.name} is ready to go.`,
                        })

                        this.updateProjectSetting({
                            id: this.project.id,
                            key: 'status',
                            value: 'stopped',
                        })
                    })

                this.$router.push({ name: 'home' })
            },
        },

        watch: {
            temporary() {
                this.onInput(
                    'path',
                    `${this.temporary.path}/${this.temporary.name}`,
                )
            },

            'project.path': function (value, oldValue) {
                if (value === oldValue) {
                    return
                }

                if (!this.valid) {
                    return
                }

                window.ipc
                    .invoke('filesystem', {
                        id: this.project.id,
                        type: 'exists',
                        path: this.project.path,
                    })
                    .then(response => {
                        // 'response.value' contains a boolean indicating whether the file exists or not
                        if (!response.value) {
                            return (this.errors.path = '')
                        }

                        this.errors.path = 'This folder already exists'
                    })
            },

            'project.database.type': function (value, oldValue) {
                if (value === oldValue) {
                    return
                }

                this.onInput(
                    'database.version',
                    match(value, {
                        mysql: '5.7',
                        postgres: '12',
                    }),
                )
                this.onInput(
                    'database.port',
                    match(value, {
                        mysql: '3306',
                        postgres: '5432',
                    }),
                )
            },
        },
    }
</script>
