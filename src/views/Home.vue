<template>
    <Box
        justify="center"
        :spaceY="20"
        minHeight="screen"
        color="gray"
        shade="100"
    >
        <Stack align="center" :space="4">
            <Headline>
                Serve
            </Headline>
            <div v-if="projects.length">
                <Stack
                    color="white"
                    :borderWidth="1"
                    borderColor="gray"
                    borderShade="300"
                    borderRadius="normal"
                    :width="80"
                >
                    <TextLink
                        v-for="project in projects"
                        :key="project.id"
                        :to="{
                            name: 'project.overview',
                            params: { id: project.id },
                        }"
                        class="w-full border-b-1 border-gray-300 last:border-0 hover:underline"
                    >
                        <Box
                            :spaceX="6"
                            :spaceY="4"
                            :borderWidthB="1"
                            width="full"
                            align="center"
                            justify="between"
                        >
                            <Copy color="indigo" shade="700" weight="medium">
                                {{ project.name }}
                            </Copy>
                            <Status :value="project.status" />
                        </Box>
                    </TextLink>
                </Stack>
                <Box :width="80" justify="between">
                    <Button variant="secondary">
                        Import
                    </Button>
                    <Button>
                        Create
                    </Button>
                </Box>
            </div>

            <Stack
                v-if="!projects.length"
                color="white"
                :width="80"
                align="stretch"
                :borderWidth="1"
                borderColor="gray"
                borderShade="300"
                borderRadius="normal"
                :spaceX="6"
                :spaceY="8"
                :space="4"
            >
                <Headline :level="4" align="center"
                    >Create or import project</Headline
                >
                <Copy
                    color="gray"
                    shade="700"
                    size="sm"
                    align="center"
                    lineHeight="normal"
                >
                    This is where all your projects are listed. Create a new
                    project or import an existing one to get started.
                </Copy>
                <Inline justify="center" :space="4">
                    <Button variant="secondary">
                        Import
                    </Button>
                    <Button>
                        Create
                    </Button>
                </Inline>
            </Stack>
        </Stack>
    </Box>
</template>

<script>
    import { mapGetters } from 'vuex'

    import Box from '@/components/Box'
    import Copy from '@/components/Copy'
    import Stack from '@/components/Stack'
    import Button from '@/components/Button'
    import Status from '@/components/Status'
    import Inline from '@/components/Inline'
    import Headline from '@/components/Headline'
    import TextLink from '@/components/TextLink'

    export default {
        components: {
            Box,
            Copy,
            Stack,
            Button,
            Status,
            Inline,
            Headline,
            TextLink,
        },

        computed: {
            ...mapGetters({
                projects: 'projects/all',
            }),
        },
    }
</script>
