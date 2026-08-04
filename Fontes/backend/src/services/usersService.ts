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
  ) { }

  // Função para cadastrar um novo usuário
  async create(userData: Partial<User>) {
    // Verifica se já existe um usuário com o e-mail informado
    const emailExists = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (emailExists) {
      throw new ConflictException('E-mail já cadastrado');
    }

    // Criptografa a senha antes de armazená-la no banco de dados
    if (userData.password) {
      const salt = await bcrypt.genSalt();
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const user = this.userRepository.create(userData);

    return this.userRepository.save(user);
  }

  // Função para buscar todos os usuários cadastrados
  async findAll() {
    return this.userRepository.find();
  }

  // Função para buscar um usuário por meio do ID
  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        treatments: {
          medication: true,
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  // Função para buscar um usuário por meio do CPF
  async findByCpf(cpf: string) {
    const user = await this.userRepository.findOne({
      where: { cpf },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado com este CPF');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {

    return this.userRepository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", {
        email,
      })
      .getOne();

  }
}