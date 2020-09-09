import { match } from '@/helpers/methods'

export const generateConfig = options => {
    const dbEnvVariables = match(options.database.type, {
        mysql: {
            MYSQL_ALLOW_EMPTY_PASSWORD: 'true',
            MYSQL_ROOT_PASSWORD: '',
            MYSQL_DATABASE: 'laravel',
        },
        postgres: {
            POSTGRES_PASSWORD: '',
            POSTGRES_USER: 'root',
            POSTGRES_DB: 'laravel',
        },
    })

    const dbVolume = match(options.database.type, {
        mysql: '/var/lib/mysql',
        postgres: '/var/lib/postgresql/data',
    })

    return {
        version: '3',
        services: {
            app: {
                image: `bjornlindholm/laravel:${options.php.version}`,
                networks: ['appnet'],
                volumes: ['./:/var/www/html'],
                ports: [`${options.server.port}:80`],
                working_dir: '/var/www/html',
            },
            cache: {
                image: `redis:${options.redis.version}`,
                networks: ['appnet'],
                volumes: ['cachedata:/data'],
            },
            db: {
                image: `${options.database.type}:${options.database.version}`,
                environment: dbEnvVariables,
                networks: ['appnet'],
                volumes: [`dbdata:${dbVolume}`],
            },
            node: {
                image: `bjornlindholm/node:${options.node.version}`,
                networks: ['appnet'],
                volumes: ['./:/opt'],
                working_dir: '/opt',
            },
        },
        networks: {
            appnet: {
                driver: 'bridge',
            },
        },
        volumes: {
            dbdata: {
                driver: 'local',
            },
            cachedata: {
                driver: 'local',
            },
        },
    }
}
