const request = require('supertest');
const app = require('../app.js'); // Caminho correto para o seu app.js

let token = '';
let agendamentoCriado;

describe('Testes de Agendamento', () => {
    beforeAll(async () => {
        // Tenta cadastrar o usuário (se já existir, sua rota de cadastro deve lidar com isso ou ignorar)
        await request(app).post('/usuarios/cadastro').send({
            nome: 'TesteAgendamento', // Use um nome diferente para evitar colisões
            email: 'teste.agendamento@email.com', // Use um email diferente para evitar colisões
            senha: 'senha123'
        });

        // Realiza o login para obter o token
        const resLogin = await request(app).post('/usuarios/login').send({
            email: 'teste.agendamento@email.com',
            senha: 'senha123'
        });

        // --- VERIFICAÇÃO CRÍTICA DO LOGIN ---
        if (resLogin.status !== 200) {
            console.error('Erro no login durante beforeAll:', resLogin.status, resLogin.body);
            // Isso fará com que o teste falhe imediatamente se o login falhar
            throw new Error('Falha ao obter token de autenticação para os testes. Verifique /usuarios/login.');
        }
        if (!resLogin.body.token) {
            console.error('Login bem-sucedido, mas nenhum token no corpo da resposta:', resLogin.body);
            throw new Error('Token não retornado após login bem-sucedido.');
        }
        
        token = resLogin.body.token;
        console.log('Token obtido no teste agendamento.test.js:', token); // Confirmar que o token foi pego aqui
    });

    it('deve criar um novo agendamento', async () => {
        // Importante: Verifique os campos que sua rota POST /agendamentos espera.
        // Sua rota agendamento.js espera: idanimal, idservico, data
        const response = await request(app)
            .post('/agendamentos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                idanimal: 1,    // Certifique-se que o ID existe no seu DB de teste ou é um mock
                idservico: 1,   // Certifique-se que o ID existe no seu DB de teste ou é um mock
                data: '2025-08-15' // Data futura, formato 'YYYY-MM-DD'
                // Se sua API espera 'hora', adicione aqui, por exemplo: hora: '10:00'
            });

        console.log('Resposta Criar Agendamento - Status:', response.status);
        console.log('Resposta Criar Agendamento - Body:', response.body);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        agendamentoCriado = response.body;
    });

    it('deve cancelar um agendamento existente', async () => {
        // Garante que agendamentoCriado foi definido antes de tentar usá-lo
        expect(agendamentoCriado).toBeDefined();
        // console.log('ID do agendamento a ser cancelado:', agendamentoCriado.id); // Descomente para depurar

        const response = await request(app)
            .delete(`/agendamentos/${agendamentoCriado.id}`)
            .set('Authorization', `Bearer ${token}`);

        console.log('Resposta Cancelar Agendamento - Status:', response.status);
        console.log('Resposta Cancelar Agendamento - Body:', response.body);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('mensagem', 'Agendamento cancelado com sucesso!');
    });

    it('deve retornar erro ao tentar cancelar um agendamento inexistente', async () => {
        const response = await request(app)
            .delete(`/agendamentos/9999`)
            .set('Authorization', `Bearer ${token}`);

        console.log('Resposta Cancelar Inexistente - Status:', response.status);
        console.log('Resposta Cancelar Inexistente - Body:', response.body);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('erro', 'Agendamento não encontrado');
    });
});