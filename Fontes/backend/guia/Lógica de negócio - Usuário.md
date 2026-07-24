1. **Diferenciação de Perfis**: Lógica no `UsersService` que, ao cadastrar um Administrador, cria automaticamente a entidade `Institution` vinculada a ele. 

2. **Vinculação de Pacientes**: Capacidade de associar um usuário regular a uma instituição específica (clínica). 

3. **Segurança**: Inclusão da lógica de hash de senha com `bcrypt` (recomendado instalar via `npm install bcrypt @types/bcrypt`). 

4. **Endpoints Estratégicos**: Como a listagem de todos os pacientes de uma clínica específica, essencial para o Dashboard da Instituição. Essa estrutura permite que o sistema escale tanto para usuários individuais quanto para grandes clínicas que gerenciam centenas de pacientes. 

Paciente como Usuário: O paciente agora é um User com a role: PATIENT, vinculado obrigatoriamente a uma clínica.

Buscas Personalizadas: Adicionei métodos para que a clínica busque pacientes por nome ou CPF e visualize o progresso completo dos tratamentos (quem está tomando o que e se está atrasado).

Controle de Acesso: As rotas foram estruturadas para sempre exigir o ID da instituição, isolando os dados de cada clínica.

Essa estrutura permite que a clínica atue como a gestora do tratamento.

Instalar o bcrypt (npm install bcrypt @types/bcrypt) para a segurança das senha.
