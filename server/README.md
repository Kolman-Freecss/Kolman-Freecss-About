# Server side 

Here is the server side of the project.

___


`anime` and `post` -> 2 microservices with NodeJs and Express are implemented:
  - `anime-service`
  - `post-service` 

Both services are connected to a MongoDB database.

They share code with a common module `node-micro-common`.

Connected with a NATS streaming server as event bus (In the `infra` folder).

___

`_ai` folder is a container for Python app with TensorFlow

___

`_java` folder is a container for 2 Java microservices with SpringBoot



___