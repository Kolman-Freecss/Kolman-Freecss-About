- Execute the following command to start up the NATS server:
```bash
docker build -t nats-server .
docker run -d --name nats-server -p 4222:4222 nats-server
```
