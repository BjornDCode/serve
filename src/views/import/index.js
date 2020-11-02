import Project from '@/views/import/Project'
import Server from '@/views/import/Server'
import Php from '@/views/import/Php'
import Node from '@/views/import/Node'
import Redis from '@/views/import/Redis'
import Database from '@/views/import/Database'

export default [
    {
        path: 'project',
        name: 'import.laravel.project',
        component: Project,
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
