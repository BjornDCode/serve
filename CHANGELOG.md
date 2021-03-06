# Changelog

## [0.4.2]

-   PHP 8 Release Candidate 3 support

## [0.4.1]

-   Fix issue where some DB environment variables weren't updated on import
-   Fix issue where year wasn't show in logs

## [0.4.0]

-   Add logs screen
-   Add actions screen in import flow
-   Add simple analytics

## [0.3.1]

-   Add Serve logo
-   Remove 7.2 from PHP selector
-   Split import flow into small steps
-   Fix import issue with projects without a .env file
-   Add support for cloning repositories in the import flow

## [0.3.0]

-   Revamped the app menu
-   Added a command palette
-   Added keyboard shortcuts for common actions
-   Fix bug where all select menus would open when pressing 'Enter'

## [0.2.0]

-   Save prefered editor when changing it in quick actions
-   Add folder, browser, terminal, and database quick actions
-   Order projects by last usage
-   Automatically install predis when creating new projects
-   Automatically update .env
-   Add CLI tool to run commands inside containers

## [0.1.1]

### Fixed

-   Fix issue where changing database type in project settings wouldn't automatically update the version to one available for that database type
-   Fix issue where it attempted to read `serve.toml` while projects were being created
-   Notify users when updating

## [0.1.0]

### Added

-   Creating / Importing Laravel projects
-   Running projects in a Docker environment
