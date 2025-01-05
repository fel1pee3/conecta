# Conecta

Conecta é uma aplicação moderna de troca de mensagens desenvolvida para facilitar a comunicação entre usuários de maneira prática e segura. Ideal para comunidades, grupos de trabalho e conexões pessoais, a plataforma prioriza a simplicidade e a eficiência.

## Status
🚧 Projeto em desenvolvimento 🚧

## Pré-visualização
Confira uma prévia do Conecta:

![Conecta Screenshot](https://via.placeholder.com/800x400?text=Conecta+Preview)

---

## Funcionalidades
- ✅ Envio e recebimento de mensagens em tempo real.
- ✅ Sistema de autenticação seguro (JWT).
- ✅ Criação de contas e gerenciamento de perfis de usuário.
- ✅ Design responsivo para dispositivos móveis e desktops.

---

## Tecnologias Utilizadas
- **Frontend:** React.js
- **Backend:** Node.js com Express
- **Banco de Dados:** MySQL
- **WebSocket:** Socket.IO para comunicação em tempo real
- **Autenticação:** JWT (JSON Web Tokens)

---

## Como Começar

### Pré-requisitos
Certifique-se de ter instalado:
- **Node.js** (v16 ou superior)
- **MySQL**
- **Git**

### Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/fel1pee3/conecta.git
    cd conecta
    ```

2. Instale as dependências do backend:
    ```bash
    cd backend
    npm install
    ```

3. Configure o arquivo `.env` no backend:
    ```env
    DB_HOST="localhost"
    DB_USER="root"
    DB_PASSWORD="SUA-SENHA"
    DB_DATABASE="conecta"
    PORT=3000
    JWT_KEY="SUA-CHAVE-JWT"
    ```

4. Inicie o backend:
    ```bash
    npm start
    ```

5. Instale as dependências do frontend:
    ```bash
    cd ../frontend
    npm install
    ```

6. Inicie o frontend:
    ```bash
    npm run dev
    ```

7. Acesse a aplicação em `http://localhost:3000`.

---

## Licença
Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para mais informações.
