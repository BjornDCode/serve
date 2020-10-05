import toml from '@iarna/toml'
import yaml from 'yaml'
import env from '@/helpers/env'

import { match, removeKeys } from '@/helpers/methods'

export const generateDockerConfig = options => {
    const dbEnvVariables = match(options.database.type, {
        mysql: {
            MYSQL_ROOT_PASSWORD: 'root',
            MYSQL_DATABASE: 'laravel',
        },
        postgres: {
            POSTGRES_PASSWORD: 'root',
            POSTGRES_USER: 'root',
            POSTGRES_DB: 'laravel',
        },
    })

    const dbVolume = match(options.database.type, {
        mysql: '/var/lib/mysql',
        postgres: '/var/lib/postgresql/data',
    })

    return yaml.stringify({
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
                ports: [`${options.database.port}:${options.database.port}`],
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
    })
}

export const generateServeConfig = options => {
    return toml.stringify(removeKeys(options, ['id', 'path', 'name', 'status']))
}

export const generateEnvConfig = (defaults, options) => {
    return env.replace(defaults, {
        DB_HOST: 'db',
        DB_PASSWORD: 'root',
        DB_CONNECTION: match(options.database.type, {
            mysql: 'mysql',
            postgres: 'pgsql',
        }),
        DB_PORT: options.database.port,
        CACHE_DRIVER: 'redis',
        SESSION_DRIVER: 'redis',
        REDIS_CLIENT: 'predis',
        REDIS_HOST: 'cache',
    })
}
