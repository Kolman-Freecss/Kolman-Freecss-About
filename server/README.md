# Server side 

Here is the server side of the project.

___

2 microservices with NodeJs and Express are implemented:
  - `anime-service`
  - `post-service` 

Both services are connected to a MongoDB database.

They share code with a common module `common`.

Connected with a NATS streaming server as event bus (In the `infra` folder).

___
