import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entidades/User';
import { Institution } from '../entidades/Institution';
import { CreateUserDto } from 'src/dtos/userDTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Institution)
    private institutionRepository: Repository<Institution>,
  ) {}

  async create(dto: CreateUserDto) {
    const emailExists = await this.userRepository.findOne({ where: { email: dto.email } });
    if (emailExists) throw new ConflictException('E-mail já cadastrado');

    // Criptografia de senha (recomendado instalar bcrypt)
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    // Lógica de "Herança" / Diferenciação
    if (dto.role === UserRole.ADMIN && dto.cnpj) {
      // Se for Admin, criamos a Instituição vinculada
      const institution = this.institutionRepository.create({
        name: `${dto.name} Clinic`, // Nome inicial baseado no usuário
        cnpj: dto.cnpj,
      });
      const savedInstitution = await this.institutionRepository.save(institution);
      user.institution = savedInstitution;
    } else if (dto.institutionId) {
      // Se for paciente vinculado a uma clínica
      user.institution = { id: dto.institutionId } as Institution;
    }

    const savedUser = await this.userRepository.save(user);
    delete savedUser.password; // Remove senha do retorno
    return savedUser;
  }

  async findAll() {
    return this.userRepository.find({ relations: ['institution'] });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ 
      where: { id }, 
      relations: ['institution', 'treatments'] 
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async findPatientsByInstitution(institutionId: string) {
    return this.userRepository.find({
      where: { institution: { id: institutionId }, role: UserRole.PATIENT }
    });
  }
}