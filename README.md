# 🐾 Petshop API

API RESTful de um Petshop desenvolvida com Node.js e Express, com autenticação JWT e testes automatizados.

---

## 🔧 Tecnologias

- Node.js
- Express
- JWT (jsonwebtoken)
- Jest (para testes)
- Supertest
- Bcrypt.js

---

## 📂 Estrutura de Pastas

```
trabalhoAPI/
├── controllers/
├── middlewares/
├── routes/
├── tests/
├── app.js
├── server.js
├── package.json
```

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/euclidesrs/Petshop-API-2025-Atualizado.git
cd trabalhoAPI
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar o servidor
```bash
npm run dev
```

### 4. Rodar os testes
```bash
npm test
```

---

## 🔒 Testando Segurança com Token JWT

### A. Gerar token
Faça login com:
```json
POST /usuarios/login
{
  "email": "euclidesrs91@email.com",
  "senha": "9875"
}
```

Copie o token retornado.

### B. Rotas protegidas que exigem token:
- `POST /agendamentos`
- `DELETE /agendamentos/:id`

Adicione no cabeçalho:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## ✅ Funcionalidade que manipula duas entidades

A rota `POST /agendamentos` faz relação entre:
- `idanimal`
- `idservico`

---

## 🧪 Testes Automatizados

Os testes cobrem:
- Cadastro e login
- Agendamento de serviço
- Cancelamento de agendamento
- Casos de erro (sem token, dados inválidos)

---

## 📫 Autor

Euclides Silveira
