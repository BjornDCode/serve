import store from '@/store'
import router from '@/router'
import Command from '@/entities/Command'

import { match } from '@/helpers/methods'

const openModal = context => store.dispatch('app/setModal', context)

export default [
    new Command('OpenShortcutsModal', 'Help', 'List keyboard shortcuts', () =>
        openModal('ShortcutsModal'),
    ),
    new Command(
        'OpenDocumentation',
        'Help',
        'Open documentation',
        () => {
            window.ipc.invoke('launch', {
                type: 'browser',
                path: 'https://github.com/BjornDCode/serve',
            })
        },
        () => true,
        true,
    ),
    new Command(
        'OpenVersions',
        'Help',
        'See versions',
        () => {
            window.ipc.invoke('launch', {
                type: 'browser',
                path: 'https://github.com/BjornDCode/serve/releases',
            })
        },
        () => true,
        true,
    ),
    new Command(
        'OpenChangelog',
        'Help',
        'Open changelog',
        () => {
            window.ipc.invoke('launch', {
                type: 'browser',
                path:
                    'https://github.com/BjornDCode/serve/blob/master/CHANGELOG.md',
            })
        },
        () => true,
        true,
    ),
    new Command(
        'OpenGithubIssues',
        'Help',
        'Report a bug',
        () => {
            window.ipc.invoke('launch', {
                type: 'browser',
                path: 'https://github.com/BjornDCode/serve/issues',
            })
        },
        () => true,
        true,
    ),
    new Command(
        'OpenCommandPalette',
        'Tools',
        'Open command palette',
        () => openModal('CommandsModal'),
        () => false,
    ),
    // Project
    new Command(
        'StartProject',
        'Project',
        'Start project',
        ({ project }) => store.dispatch('projects/toggle', project),
        ({ project }) => {
            // Should only be visible if inside a project
            return !!project && project.status === 'stopped'
        },
        true,
    ),
    new Command(
        'StopProject',
        'Project',
        'Stop project',
        ({ project }) => store.dispatch('projects/toggle', project),
        ({ project }) => {
            // Should only be visible if inside a project
            return !!project && project.status === 'running'
        },
        true,
    ),
    new Command(
        'ShowOverview',
        'Project',
        'Show overview',
        ({ project }) => {
            router.push({
                name: 'project.overview',
                params: { id: project.id },
            })
        },
        ({ project }) => {
            // Should only be visible if inside a project
            return !!project
        },
        true,
    ),
    new Command(
        'ShowSettings',
        'Project',
        'Show settings',
        ({ project }) => {
            router.push({
                name: 'project.settings',
                params: { id: project.id },
            })
        },
        ({ project }) => {
            // Should only be visible if inside a project
            return !!project
        },
        true,
    ),
    // Launch
    new Command(
        'OpenInEditor',
        'Launch',
        'Open in editor',
        () => openModal('SelectEditorToOpenProjectInModal'),
        ({ project }) => {
            // Should only be visible if inside a project
            return !!project
        },
        false,
    ),
    new Command(
        'OpenInGithubDesktop',
        'Launch',
        'Open in GitHub Desktop',
        ({ project }) =>
            store.dispatch('projects/launch', {
                type: 'github',
                path: project.path,
            }),
        ({ project }) => {
            // Should only be visible if inside a project
            return !!project
        },
        true,
    ),
    new Command(
        'OpenInTerminal',
        'Launch',
        'Open in terminal',
        ({ project }) =>
            store.dispatch('projects/launch', {
                type: 'terminal',
                path: project.path,
            }),
        ({ project }) => {
            // Should only be visible if inside a project
            return !!project
        },
        true,
    ),
    new Command(
        'OpenDatabase',
        'Launch',
        'Open database',
        ({ project }) => {
            const protocol = match(project.database.type, {
                mysql: 'mysql',
                postgres: 'postgresql',
            })
            store.dispatch('projects/launch', {
                type: 'database',
                path: `${protocol}://root:root@127.0.0.1:${project.database.port}/laravel`,
            })
        },
        ({ project }) => {
            // Should only be visible if inside a project
            return !!project && project.status === 'running'
        },
        true,
    ),
    new Command(
        'OpenInBrowser',
        'Launch',
        'Open in browser',
        ({ project }) =>
            store.dispatch('projects/launch', {
                type: 'browser',
                path: `http://localhost:${project.server.port}`,
            }),
        ({ project }) => {
            // Should only be visible if inside a project
            return !!project
        },
        true,
    ),
    new Command(
        'OpenFolder',
        'Launch',
        'Open folder',
        ({ project }) =>
            store.dispatch('projects/launch', {
                type: 'filesystem',
                path: project.path,
            }),
        ({ project }) => {
            // Should only be visible if inside a project
            return !!project
        },
        true,
    ),
]
