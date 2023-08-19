import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { User } from '../entity/user.entity';
import { Profile } from '../entity/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createUser(user: CreateUserDto) {
    const userFound = await this.usersRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (userFound) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const nweUser = this.usersRepository.create(user);
    return this.usersRepository.save(nweUser);
  }
  findUserAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserOne(id: number) {
    const userFound = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!userFound) {
      return new HttpException('User not fonnd', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  async deleteUser(id: number) {
    const userFound = await this.usersRepository.delete(id);
    if (userFound.affected === 0) {
      return new HttpException('User not fonnd', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const userFound = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!userFound) {
      return new HttpException('User not fonnd', HttpStatus.NOT_FOUND);
    }
    const updateUser = Object.assign(userFound, updateUserDto);
    return this.usersRepository.save(updateUser);
  }

  async createProfile(id: number, profile: CreateProfileDto) {
    const userFound = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!userFound) {
      return new HttpException('User not fonnd', HttpStatus.NOT_FOUND);
    }

    const newProfile = this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(newProfile);
    userFound.profile = savedProfile;

    return this.usersRepository.save(userFound);
  }
}
