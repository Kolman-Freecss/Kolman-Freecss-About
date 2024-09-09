# Server Side Posts - Kolman-Freecss - NodeJs 

Built with NodeJs Express

## Used

- NodeJs v20
- Express v5
- MongoDB with MongoDB Atlas

## Installation

- Create a .env file with the next variables:

```bash
MONGO_URI=your_mongo_uri
```

## Getting Started

### Local

#### Docker method

- Use .run folder, there is a docker configuration file to run the server.

- Or use the next command:

```bash
docker build -t micro-posts-image .
docker run --name micro-posts -p 3000:3000 micro-posts-image
```

### Deploy

```bash
```

## Troubleshoting

### Firebase

---

Shield: [![CC-BY-NC-ND 4.0][CC-BY-NC-ND-shield]][CC-BY-NC-ND]

This work is licensed under a [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.][CC-BY-NC-ND]

[![CC-BY-NC-ND 4.0][CC-BY-NC-ND-image]][CC-BY-NC-ND]

[CC-BY-NC-ND-shield]: https://img.shields.io/badge/License-CC--BY--NC--ND--4.0-lightgrey
[CC-BY-NC-ND]: http://creativecommons.org/licenses/by-nc-nd/4.0/
[CC-BY-NC-ND-image]: https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png
