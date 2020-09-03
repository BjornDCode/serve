export const config = {
    version: '3',
    services: {
        app: {
            build: {
                context: './',
                dockerfile: './docker/app/Dockerfile',
            },
            image: 'bjornlindholm/laravel:latest',
            networks: ['appnet'],
            volumes: ['./:/var/www/html'],
            ports: ['80:80'],
            working_dir: '/var/www/html',
        },
        cache: {
            image: 'redis:alpine',
            networks: ['appnet'],
            volumes: ['cachedata:/data'],
        },
        db: {
            image: 'mysql:5.7',
            environment: {
                MYSQL_ROOT_PASSWORD: 'root',
                MYSQL_DATABASE: 'laravel',
            },
            networks: ['appnet'],
            volumes: ['dbdata:/var/lib/mysql'],
        },
        node: {
            build: {
                context: './',
                dockerfile: './docker/node/Dockerfile',
            },
            image: 'bjornlindholm/node:latest',
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
