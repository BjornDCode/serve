<template>
    <Skeleton>
        <Stack :space="8" width="full">
            <Stack :space="4">
                <Headline :level="2">
                    Repository
                </Headline>

                <Paragraph>
                    Have you cloned your project?
                </Paragraph>
            </Stack>

            <Inline align="stretch" width="full" :space="8">
                <Button
                    component="router-link"
                    :to="{ name: 'import.laravel.repository' }"
                    size="medium"
                    justify="center"
                    expand
                >
                    No
                </Button>
                <Button
                    component="router-link"
                    :to="{ name: 'import.laravel.local' }"
                    size="medium"
                    justify="center"
                    expand
                >
                    Yes
                </Button>
            </Inline>
        </Stack>

        <template #footer>
            <ActionBar>
                <template #left>
                    <Button
                        component="router-link"
                        :to="{ name: 'home' }"
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                </template>
            </ActionBar>
        </template>
    </Skeleton>
</template>

<script>
    import Stack from '@/components/Stack'
    import Button from '@/components/Button'
    import Inline from '@/components/Inline'
    import Headline from '@/components/Headline'
    import Skeleton from '@/views/import/Skeleton'
    import Paragraph from '@/components/Paragraph'
    import ActionBar from '@/components/ActionBar'

    export default {
        components: {
            Stack,
            Button,
            Inline,
            Headline,
            Skeleton,
            Paragraph,
            ActionBar,
        },

        props: {
            values: {
                required: true,
            },
        },
    }
</script>
