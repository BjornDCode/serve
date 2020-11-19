<template>
    <Skeleton>
        <Stack :space="8" width="full">
            <Stack :space="4">
                <Headline :level="2">
                    Preparing your project
                </Headline>

                <Paragraph>
                    Run these actions before your project is ready to go.
                </Paragraph>
            </Stack>

            <Stack align="stretch" width="full">
                <Card>
                    <ul class="w-full">
                        <li
                            v-for="(action, index) in actions"
                            :key="index"
                            class="border-b border-gray-200"
                        >
                            <Inline
                                justify="between"
                                align="center"
                                :spaceX="4"
                                :spaceY="4"
                            >
                                <Copy
                                    size="sm"
                                    color="gray"
                                    shade="700"
                                    weight="medium"
                                    class="flex-1 truncate mr-2"
                                    >{{ action.description }}</Copy
                                >
                                <Button
                                    v-if="!action.completed"
                                    :disabled="working"
                                    @click="action.handler"
                                >
                                    <ConditionalText
                                        :condition="action.loading"
                                        true="Running..."
                                        false="Run action"
                                    />
                                </Button>
                                <Icon
                                    v-else
                                    name="checkmark"
                                    color="green"
                                    shade="400"
                                />
                            </Inline>
                        </li>
                    </ul>
                </Card>
            </Stack>
        </Stack>

        <template #footer>
            <ActionBar>
                <template #left>
                    <Button
                        component="router-link"
                        :to="{ name: 'import.laravel.database' }"
                        variant="secondary"
                        :disabled="working"
                    >
                        Back
                    </Button>
                </template>
                <template #right>
                    <Button :disabled="!canImport" @click="handle">
                        Import
                    </Button>
                </template>
            </ActionBar>
        </template>
    </Skeleton>
</template>

<script>
    import { command } from '@/helpers/commands'
    import { generateEnvConfig } from '@/config/files'

    import Icon from '@/components/Icon'
    import Copy from '@/components/Copy'
    import Card from '@/components/Card'
    import Stack from '@/components/Stack'
    import Inline from '@/components/Inline'
    import Button from '@/components/Button'
    import Headline from '@/components/Headline'
    import Skeleton from '@/views/import/Skeleton'
    import Paragraph from '@/components/Paragraph'
    import ActionBar from '@/components/ActionBar'
    import ConditionalText from '@/components/ConditionalText'

    export default {
        components: {
            Icon,
            Copy,
            Card,
            Stack,
            Inline,
            Button,
            Headline,
            Skeleton,
            Paragraph,
            ActionBar,
            ConditionalText,
        },

        props: {
            values: {
                type: Object,
                required: true,
            },
            valid: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                actions: {
                    env: {
                        description: 'Generate .env file',
                        handler: () => this.generateEnvFile(),
                        completed: false,
                        loading: false,
                    },
                    composer: {
                        description: 'Install Composer dependencies',
                        handler: () => this.runComposer(),
                        completed: false,
                        loading: false,
                    },
                    npm: {
                        description: 'Install Node packages',
                        handler: () => this.runNpm(),
                        completed: false,
                        loading: false,
                    },
                    key: {
                        description: 'Generate application key',
                        handler: () => this.generateKey(),
                        completed: false,
                        loading: false,
                    },
                },
            }
        },

        computed: {
            working() {
                return Object.values(this.actions).some(
                    action => action.loading,
                )
            },

            canImport() {
                return this.valid && !this.working
            },
        },

        mounted() {
            this.checkEnvFile()
            this.checkComposer()
            this.checkNpm()
            this.checkKey()
        },

        methods: {
            checkEnvFile() {
                command('CheckExists', `${this.values.path}/.env`, exists => {
                    this.actions.env.completed = exists
                })
            },

            generateEnvFile() {
                this.actions.env.loading = true
                command('ReadStub', '.env', contents => {
                    command(
                        'WriteFile',
                        `${this.values.path}/.env`,
                        generateEnvConfig(contents, this.values),
                        () => {
                            this.actions.env.loading = false
                            this.checkEnvFile()
                            this.checkKey()
                        },
                    )
                })
            },

            checkComposer() {
                command('CheckExists', `${this.values.path}/vendor`, exists => {
                    this.actions.composer.completed = exists
                })
            },

            runComposer() {
                this.actions.composer.loading = true
                command(
                    'RunCommandInContainer',
                    this.values.path,
                    'docker-compose run --rm app composer install',
                    () => {
                        this.actions.composer.loading = false
                        this.checkComposer()
                    },
                )
            },

            checkNpm() {
                command(
                    'CheckExists',
                    `${this.values.path}/node_modules`,
                    exists => {
                        this.actions.npm.completed = exists
                    },
                )
            },

            runNpm() {
                this.actions.npm.loading = true
                command(
                    'RunCommandInContainer',
                    this.values.path,
                    'docker-compose run --rm node npm install',
                    () => {
                        this.actions.npm.loading = false
                        this.checkNpm()
                    },
                )
            },

            checkKey() {
                command('CheckEnvFileHasKey', this.values.path, exists => {
                    this.actions.key.completed = exists
                })
            },

            generateKey() {
                this.actions.key.loading = true
                command(
                    'RunCommandInContainer',
                    this.values.path,
                    'docker-compose run --rm app php artisan key:generate',
                    () => {
                        this.actions.key.loading = false
                        this.checkKey()
                    },
                    'Please install Composer dependencies first.',
                )
            },

            handle() {
                this.$emit('finish')
            },
        },
    }
</script>
