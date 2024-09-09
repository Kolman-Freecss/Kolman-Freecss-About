import { PostCreatedEvent, Publisher, Subjects } from '@kolman-freecss-org/node-micro-common';

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
  subject: Subjects.PostCreated = Subjects.PostCreated;
}