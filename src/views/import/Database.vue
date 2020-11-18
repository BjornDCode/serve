<template>
    <Skeleton>
        <Stack :space="8" width="full">
            <Stack :space="4">
                <Headline :level="2">
                    Database
                </Headline>

                <Paragraph>
                    Configure database settings for this project.
                </Paragraph>
            </Stack>

            <Stack align="stretch" width="full" :space="8">
                <SelectField
                    label="Type"
                    :options="['mysql', 'postgres']"
                    :value="values.database.type"
                    @input="
                        $emit('input', { key: 'database.type', value: $event })
                    "
                />
                <SelectField
                    label="Version"
                    :options="databaseVersionOptions"
                    :value="values.database.version"
                    @input="
                        $emit('input', {
                            key: 'database.version',
                            value: $event,
                        })
                    "
                />
                <TextField
                    label="Port"
                    :value="values.database.port"
                    @input="
                        $emit('input', { key: 'database.port', value: $event })
                    "
                />
            </Stack>
        </Stack>

        <template #footer>
            <ActionBar>
                <template #left>
                    <Button
                        component="router-link"
                        :to="{ name: 'import.laravel.redis' }"
                        variant="secondary"
                    >
                        Back
                    </Button>
                </template>
                <template #right>
                    <Button
                        component="router-link"
                        :to="{ name: 'import.laravel.actions' }"
                        :disabled="!canContinue"
                    >
                        Next
                    </Button>
                </template>
            </ActionBar>
        </template>
    </Skeleton>
</template>

<script>
    import { match } from '@/helpers/methods'

    import Stack from '@/components/Stack'
    import Button from '@/components/Button'
    import Headline from '@/components/Headline'
    import Skeleton from '@/views/import/Skeleton'
    import Paragraph from '@/components/Paragraph'
    import ActionBar from '@/components/ActionBar'
    import TextField from '@/components/TextField'
    import SelectField from '@/components/SelectField'

    export default {
        components: {
            Stack,
            Button,
            Headline,
            Skeleton,
            Paragraph,
            ActionBar,
            TextField,
            SelectField,
        },

        props: {
            values: {
                required: true,
            },
        },

        computed: {
            databaseVersionOptions() {
                return match(this.values.database.type, {
                    mysql: ['8', '5.7', '5.6'],
                    postgres: ['13', '12', '11', '10', '9.5', '9'],
                    default: [],
                })
            },

            canContinue() {
                return (
                    this.values.database.type &&
                    this.values.database.version &&
                    this.values.database.port
                )
            },
        },
    }
</script>
