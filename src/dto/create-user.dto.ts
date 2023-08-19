export class CreateUserDto {
    username: string;
    password: string;
    status: boolean;
    createdAt: Date;
    profileId: number;
}