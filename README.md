# Serve

Serve helps you quickly spin up local environments and run your projects in a container. No Docker knowledge required.

**Note:** Currently Serve works with Laravel projects.

## Why Serve?

Serve's goal is to allow developers to quickly set up a local environment and create/run projects without any hassle—no need to install anything locally on your computer.

Too often, I've updated PHP only to find out that none of my projects worked anymore, that MySQL wasn't appropriately updated, and realised I have to spend several days running through Stack Overflow threads to find a solution.

Docker solves all the problems above. But it introduces a new problem. You now have to learn Docker. Serve abstracts all that away and allows you to never think about it again.

Serve does the following:

-   Creates a docker environment for your project
-   Installs services for PHP, NGINX, MySQL, Redis, etc. in the Docker environment.
-   Starts / Stops the Docker container
-   Provide other convenient features for managing your local environment

For more information, please read the [VISION](VISION.md) document.

## Installation

1. [Install](https://www.docker.com/get-started) and run Docker
2. [Download](https://github.com/BjornDCode/serve/releases/latest) Serve (Download the .dmg file)
3. Launch Serve

## Usage

With Serve, you can import existing projects or create new ones.

For each project, you can specify versions for PHP and Node and choose database type and version.

A Serve project comes with a web server, so all you have to do is start the project and then access it.

All configuration files live in your repository. That makes it easy to share the configuration with teammates. If you ever want to stop using Serve, a fully-functioning `docker-compose` file can be run independently from Serve.

## CLI

Serve has a CLI tool to run terminal commands. This means you don't need to have NPM installed locally to run NPM commands or Composer installed to run Composer commands. The CLI tool is automatically installed when openening Serve for the first time.

```
serve node
serve npm
serve yarn
serve mysql
serve mysqldump
serve psql
serve php
serve composer
serve phpunit
serve redis
serve redis-cli
```

## Advanced

### Customising Docker images

If you need to customise the Docker images for custom behavior you can do so with the following steps:

1. Create a `docker` folder
2. Create a `Dockerfile` inside the `docker folder
3. Add changes to the `Dockerfile`

```
FROM bjornlindholm/laravel:7.4

// Add changes here

CMD ["supervisord"]
```

4. Update `docker-compose.yml`

Replace the following snippet

```
image: bjornlindholm/laravel:7.4
```

To build your own docker image

```
build:
  context: ./docker
```

### Installing PHP extensions

If you need to install PHP extensions that aren't included in the base docker image you can do that by creating your own docker image. (See steps above)

```
FROM bjornlindholm/laravel:7.4

RUN apt-get update
RUN apt-get install -y php7.4-gmp

CMD ["supervisord"]
```

## Roadmap

Please see [ROADMAP](ROADMAP.md) for more planned features.

## Contribution

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for details.

## Credits

-   [Chris Fidao](https://twitter.com/fideloper) - For making [https://serversforhackers.com/](https://serversforhackers.com/). His Docker series inspire much of the Laravel image.
-   [Local by Flywheel](https://localwp.com/) - For inspiration

## Disclaimer

Serve isn't stable yet. Things might change, break, require reinstallation, etc.

Serve has only been tested on macOS. The goal is to support Windows and Linux soon, but it's not quite there yet. If you are using Windows or Linux, any testing, feedback, and fixes for those platforms are welcome.
