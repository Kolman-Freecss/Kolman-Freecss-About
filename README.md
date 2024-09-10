# Kolman Freecss

As **principal purpose** is to deploy my web application as a showcase. 

**Kolman Freecss** is my alias. I'm a software engineer who loves to code and learn new things. 

This repository is a personal project where I'm building different stuff as showcase.

## Index

- [Getting Started](#getting-started)
- [Tech stacks](#tech-stacks)
- [Architecture](#architecture)
- [Infrastructure](#infrastructure)
- [Troubleshoting](#troubleshoting)

## Getting Started

How to run the project:

1. Clone the repository.
2. Run `npm install` in the next folders:
   - `client`
   - `server`
     - `anime`
     - `post`
     - `node-micro-common`
3. Run `docker-compose up` in the `infra` folder. (This will start the NATS streaming server).

## Tech stacks

#### Front:

- Angular
- Karma

#### Back:

- Node.js
- Express
- Jest

#### DDBB:

- Firebase
- MongoDB

#### Streaming server:

- NATS

## Architecture

- Microservices.
- Hexagonal. 
- Event-driven.

Check the `server` folder.

## Infrastructure

- Docker
- Docker-compose
- Kubernetes
- Skaffold
- AWS
- Github Actions

## Troubleshoting


---

Shield: [![CC-BY-NC-ND 4.0][CC-BY-NC-ND-shield]][CC-BY-NC-ND]

This work is licensed under a [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.][CC-BY-NC-ND]

[![CC-BY-NC-ND 4.0][CC-BY-NC-ND-image]][CC-BY-NC-ND]

[CC-BY-NC-ND-shield]: https://img.shields.io/badge/License-CC--BY--NC--ND--4.0-lightgrey
[CC-BY-NC-ND]: http://creativecommons.org/licenses/by-nc-nd/4.0/
[CC-BY-NC-ND-image]: https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png
