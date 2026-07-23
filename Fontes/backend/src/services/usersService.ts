import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entidades/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>) {
    const emailExists = await this.userRepository.findOne({ where: { email: userData.email } });
    if (emailExists) throw new ConflictException('E-mail já cadastrado');

    // Criptografia opcional de senha
    if (userData.password) {
      const salt = await bcrypt.genSalt();
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ 
      where: { id },
      relations: {
        treatments: {
          medication: true
        }
      }
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async findByCpf(cpf: string) {
    const user = await this.userRepository.findOne({ where: { cpf } });
    if (!user) throw new NotFoundException('Usuário não encontrado com este CPF');
    return user;
  }
}