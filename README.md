# Coding Dojo Manager

Uma aplicação web moderna para gerenciar sessões de Coding Dojo, desenvolvida com Next.js e Tailwind CSS.

## 🚀 Funcionalidades

- ⏱️ Timer visual com contador analógico e digital
- 👥 Gerenciamento de participantes com drag'n'drop
- 🔄 Rotação automática de piloto e copiloto
- 📊 Histórico de sessões
- 💾 Persistência de dados local
- 🔔 Notificação sonora ao fim do timer
- 🌙 Tema escuro por padrão
- 🎯 Configuração precisa do tempo (minutos e segundos)

## 🛠️ Tecnologias

- [Next.js 14](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DnD Kit](https://dndkit.com/)
- Web Audio API

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/mothiago/coding-dojo-manager.git

# Entre no diretório
cd coding-dojo-manager

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🎮 Como Usar

1. **Adicione Participantes**
   - Digite o nome do participante
   - Pressione Enter ou clique em "Adicionar"
   - Arraste e solte para reordenar

2. **Configure o Timer**
   - Defina os minutos e segundos desejados
   - O timer reiniciará automaticamente após cada sessão

3. **Gerencie a Sessão**
   - Inicie/Pause o timer
   - Veja o piloto e copiloto atuais
   - Acompanhe o próximo par
   - Visualize o histórico de sessões

4. **Histórico**
   - Acesse o registro completo das sessões
   - Veja participantes e duração de cada sessão
   - Limpe o histórico quando necessário

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa a verificação de linting

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🐛 Bugs Conhecidos

Se você encontrar algum bug, por favor abra uma issue descrevendo o problema e os passos para reproduzi-lo.

## 📞 Contato

Seu Nome - [@seu_twitter](https://twitter.com/seu_twitter) - seu.email@exemplo.com

Link do Projeto: [https://github.com/mothiago/coding-dojo-manager](https://github.com/mothiago/coding-dojo-manager)

## 🚀 Deploy

Para fazer deploy no GitHub Pages:

1. Fork este repositório
2. Vá para Settings > Pages
3. Configure a source como "GitHub Actions"
4. Push para a branch main

O GitHub Actions irá automaticamente fazer build e deploy da aplicação.

Demo: https://seu-usuario.github.io/coding-dojo-manager