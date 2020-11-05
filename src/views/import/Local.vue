<template>
    <Skeleton>
        <Stack :space="8" width="full">
            <Stack :space="4">
                <Headline :level="2">
                    Choose project
                </Headline>

                <Paragraph>
                    Locate the project on your filesystem
                </Paragraph>
            </Stack>

            <Stack align="stretch" width="full" :space="8">
                <PathField
                    label="Path"
                    :value="values.path"
                    @input="$emit('input', { key: 'path', value: $event })"
                />
            </Stack>
        </Stack>

        <template #footer>
            <ActionBar>
                <template #left>
                    <Button
                        component="router-link"
                        :to="{ name: 'import.laravel.source' }"
                        variant="secondary"
                    >
                        Back
                    </Button>
                </template>
                <template #right>
                    <Button
                        component="router-link"
                        :to="{ name: 'import.laravel.server' }"
                        :disabled="!values.path"
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
    import PathField from '@/components/PathField'

    export default {
        components: {
            Stack,
            Button,
            Headline,
            Skeleton,
            Paragraph,
            ActionBar,
            PathField,
        },

        props: {
            values: {
                required: true,
            },
        },
    }
</script>
