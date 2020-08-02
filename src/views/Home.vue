<template>
    <div>
        <h1>
            Home
        </h1>

        <router-link
            v-for="project in projects"
            :key="project.id"
            :to="{ name: 'project.overview', params: { id: project.id } }"
        >
            {{ project.name }}
        </router-link>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                projects: 'projects/all',
            }),
        },
    }
</script>
