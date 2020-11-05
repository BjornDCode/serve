import Source from '@/views/import/Source'
import Local from '@/views/import/Local'
import Repository from '@/views/import/Repository'
import Server from '@/views/import/Server'
import Php from '@/views/import/Php'
import Node from '@/views/import/Node'
import Redis from '@/views/import/Redis'
import Database from '@/views/import/Database'

export default [
    {
        path: 'source',
        name: 'import.laravel.source',
        component: Source,
    },
    {
        path: 'local',
        name: 'import.laravel.local',
        component: Local,
    },
    {
        path: 'repository',
        name: 'import.laravel.repository',
        component: Repository,
    },
    {
        path: 'server',
        name: 'import.laravel.server',
        component: Server,
    },
    {
        path: 'php',
        name: 'import.laravel.php',
        component: Php,
    },
    {
        path: 'node',
        name: 'import.laravel.node',
        component: Node,
    },
    {
        path: 'redis',
        name: 'import.laravel.redis',
        component: Redis,
    },
    {
        path: 'database',
        name: 'import.laravel.database',
        component: Database,
    },
]
