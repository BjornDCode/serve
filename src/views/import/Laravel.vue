<template>
    <router-view
        :values="values"
        :valid="valid"
        @finish="onFinish"
        @input="onInput($event.key, $event.value)"
    />
</template>

<script>
    import { v4 as uuid } from 'uuid'
    import { mapActions } from 'vuex'
    import toml from '@iarna/toml'
    import set from 'lodash/set'
    import cloneDeep from 'lodash/cloneDeep'

    import { match } from '@/helpers/methods'

    export default {
        data() {
            return {
                values: {
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
            }
        },

        computed: {
            valid() {
                return !!this.values.path.length
            },
        },

        methods: {
            ...mapActions({
                createProject: 'projects/create',
            }),

            onInput(key, value) {
                this.values = { ...set(cloneDeep(this.values), key, value) }
            },

            onFinish() {
                this.onSave()
            },

            onSave() {
                this.createProject(this.values)
                this.$router.push({
                    name: 'home',
                })
            },
        },

        watch: {
            'values.path': function (value) {
                window.ipc
                    .invoke('filesystem', {
                        id: this.values.id,
                        type: 'exists',
                        path: `${value}/serve.toml`,
                    })
                    .then(response => {
                        // 'response.value' contains a boolean indicating whether the file exists or not
                        if (!response.value) {
                            return
                        }

                        window.ipc
                            .invoke('filesystem', {
                                id: this.values.id,
                                type: 'read',
                                path: `${this.values.path}/serve.toml`,
                            })
                            .then(response => {
                                const config = cloneDeep(
                                    toml.parse(response.value),
                                )

                                this.values = {
                                    ...this.values,
                                    ...config,
                                }
                            })
                    })
            },

            'values.database.type': function (value, oldValue) {
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
