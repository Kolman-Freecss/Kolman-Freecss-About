import { Subjects } from '../subjetcs';
export interface PostCreatedEvent {
    subject: Subjects.PostCreated;
    data: {
        title: string;
        description: string;
    };
}
