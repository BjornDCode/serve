<template>
    <Skeleton>
        <Stack :space="8" width="full">
            <Stack :space="4">
                <Headline :level="2">
                    Redis
                </Headline>

                <Paragraph>
                    Configure Redis version for this project.
                </Paragraph>
            </Stack>

            <Stack align="stretch" width="full" :space="8">
                <SelectField
                    label="Version"
                    :options="['6', '5']"
                    :value="values.redis.version"
                    @input="
                        $emit('input', { key: 'redis.version', value: $event })
                    "
                />
            </Stack>
        </Stack>

        <template #footer>
            <ActionBar>
                <template #left>
                    <Button
                        component="router-link"
                        :to="{ name: 'import.laravel.node' }"
                        variant="secondary"
                    >
                        Back
                    </Button>
                </template>
                <template #right>
                    <Button
                        component="router-link"
                        :to="{ name: 'import.laravel.database' }"
                        :disabled="!values.redis.version"
                    >
                        Next
                    </Button>
                </template>
            </ActionBar>
        </template>
    </Skeleton>
</template>

<script>
    import Stack from '@/components/Stack'
    import Button from '@/components/Button'
    import Headline from '@/components/Headline'
    import Skeleton from '@/views/import/Skeleton'
    import Paragraph from '@/components/Paragraph'
    import ActionBar from '@/components/ActionBar'
    import SelectField from '@/components/SelectField'

    export default {
        components: {
            Stack,
            Button,
            Headline,
            Skeleton,
            Paragraph,
            ActionBar,
            SelectField,
        },

        props: {
            values: {
                required: true,
            },
        },
    }
</script>
