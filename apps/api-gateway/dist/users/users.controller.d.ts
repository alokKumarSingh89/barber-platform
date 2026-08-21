import { ClientProxy } from '@nestjs/microservices';
export declare class UsersController {
    private readonly userClient;
    constructor(userClient: ClientProxy);
    getUser(id: string): Promise<unknown>;
}
