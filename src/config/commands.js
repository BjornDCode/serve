import store from '@/store'
import Command from '@/entities/Command'

const setModal = context => store.dispatch('app/setModal', context)

export default [
    new Command('OpenShortcutsModal', 'Help', 'List keyboard shortcuts', () =>
        setModal('ShortcutsModal'),
    ),
    new Command('OpenDocumentation', 'Help', 'Open documentation', () => {
        window.ipc.invoke('launch', {
            type: 'browser',
            path: 'https://github.com/BjornDCode/serve',
        })
    }),
    new Command('OpenVersions', 'Help', 'See versions', () => {
        window.ipc.invoke('launch', {
            type: 'browser',
            path: 'https://github.com/BjornDCode/serve/releases',
        })
    }),
    new Command('OpenChangelog', 'Help', 'Open changelog', () => {
        window.ipc.invoke('launch', {
            type: 'browser',
            path:
                'https://github.com/BjornDCode/serve/blob/master/CHANGELOG.md',
        })
    }),
    new Command('OpenGithubIssues', 'Help', 'Report a bug', () => {
        window.ipc.invoke('launch', {
            type: 'browser',
            path: 'https://github.com/BjornDCode/serve/issues',
        })
    }),
    new Command(
        'OpenCommandPalette',
        'Tools',
        'Open command palette',
        () => setModal('CommandsModal'),
        () => false,
    ),
    new Command(
        'StartProject',
        'Project',
        'Start project',
        () => console.log('starting project'),
        ({ project }) => {
            // Should only be visible if inside a project
            return !!project
        },
    ),
]
