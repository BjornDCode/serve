# Vision

This document is a collection of thoughts I have around Serve. Serve is still in its infancy, and I hope it can solve more problems in the future than it currently does.

## The Problem

The core problem Serve tries to solve is creating and maintaining local development environments.

Setting up a local development environment usually requires installing several of the following:

-   A runtime
-   A language
-   A database
-   A webserver
-   A package manager
-   A CLI tool to scaffold projects

Often these kinds of tools are mature and work very well. But with each tool added to the tool belt, the complexity rises. This complexity is worse for newer developers, where the path to entry can seem daunting. But the problem also exists for established teams that have to spend resources updating and documenting the environment for team members. You might think that keeping installation instructions in a `README.md` file is a requirement all teams should be able to keep up with. But the truth is that it just doesn't happen.

I started in the agency world, and in an agency, every single hour matters. The business model requires developers to work on billable tasks as much as possible. And when the deadline approaches, keeping dependencies updated, documenting the project and environment has the lowest priority.

Another adjacent problem is that keeping your environment up to date is an ongoing task. And you don't immediately feel the consequences if you don't. You might skip a single update and postpone it to the next update. But the truth is that every time you skip a version, you make the update process more problematic and more complicated resulting in you postponing the update process even further.

Countless times I've tried to update a language version (PHP) on my mac, only to find out it broke everything. Not only PHP but also Nginx, MySQL, etc. Nothing is more frustrating than reading endless Stack Overflow threads going through all the proposed solutions, to get your project running locally.

Lastly, updating a language version can be a big task if you have multiple projects that need to be updated. There might not be time to go back and update projects from years ago in an agency. But if the need ever arises to make a fix on one of these projects, you are in trouble. Specifying language and software versions for each project independently solves this problem.

## The solution

There is a solution to all the problems mentioned above: [Docker](https://www.docker.com/). Docker is a containerisation technology. A container in this context is a group of different software packages bundled together. It has a filesystem, but it's not a virtual machine. With Docker, you can create a Node container, a MySQL container, a PHP container, and an Nginx container. And you can make all these containers communicate with each other and with the files on your filesystem.

Docker is a great technology. It has one problem, though. It can be hard to learn and set up. Running Docker commands isn't a pleasant experience. Here is an example of a 'simple' Docker command to run `composer install`

```
docker run --rm --interactive --tty \
  --volume $PWD:/app \
  composer install
```

In many companies, Docker is seen as an extra added complexity, instead of a way to simplify the local development environment.

And that is where Serve comes in. It uses Docker under the hood, but it's mainly an implementation detail, not a feature. It abstracts away Docker as much as possible. The goal is that people get the benefits of using a technology like Docker without learning it.

## Side effects

Although Serve's primary goal is to make local environments easy to manage, there are potential expansion paths.

Serve runs on the filesystem and know the source code, so there are some possibilities to create GUIs for tasks commonly solved using a terminal. This could be running asset watchers, running Artisan commands in Laravel, executing unit tests, or reading log files. In that sense, it could eventually be a complete terminal replacement.

## The end-goal

I love trying out new technologies. In particular, I've been interested in playing around with Elixir and Phoenix. To get started, I have to install the Erlang runtime, Exlir, Phoenix, and the package manager for Elixir. I would love to one day spin up a new project in a few minutes and have it working.

I primarily work on Laravel and Vue projects. PHP is receiving significant updates frequently. When a new PHP version is released, I would love to open up Serve, change a value in an input field, and move on with my life.
