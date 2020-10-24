import store from '@/store'
import Command from '@/entities/Command'

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
]
