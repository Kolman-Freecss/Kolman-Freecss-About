import { Listener, PostCreatedEvent, Subjects } from '@kolman-freecss-org/node-micro-common';
import { Post } from '../../models/post';
import { Message } from 'node-nats-streaming';

export class PostCreatedListener extends Listener<PostCreatedEvent> {
  subject: Subjects.PostCreated = Subjects.PostCreated;
  queueGroupName = "posts-service";

  async onMessage(data: PostCreatedEvent['data'], msg: Message) {
    const { title, description } = data;

    const post = Post.build({
      title,
      description
    });
    await post.save();

    msg.ack();
  }
}