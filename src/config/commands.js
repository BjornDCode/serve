import store from '@/store'
import Command from '@/entities/Command'

const setModal = context => store.dispatch('app/setModal', context)

export default [
    new Command(
        'OpenShortcutsModal',
        'Help',
        'List keyboard shortcuts',
        () => setModal('ShortcutsModal'),
        true,
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
        true,
    ),
    new Command(
        'OpenCommandPalette',
        'Tools',
        'Open command palette',
        () => setModal('CommandsModal'),
        false,
    ),
]
