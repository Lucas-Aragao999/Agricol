# Roadmap: App de Registro de Visitas Tecnicas Agricolas

## Entregas

| Entrega | Escopo | Criterio de aceite | Estado |
| --- | --- | --- | --- |
| E0 | Base Expo, testes unitarios e estrutura do projeto | `npm run test:unit` executa | Em andamento |
| E1 | Telemetria do acelerometro e trava de seguranca | Modulo vetorial acima de 2.0g bloqueia o salvamento | Pendente |
| E2 | GPS e feedback de precisao | Indicador verde, amarelo ou vermelho conforme a precisao | Pendente |
| E3 | Registro e persistencia local | Visitas persistem offline apos reiniciar o app | Pendente |
| E4 | Fluxo de telas responsivo | Criar, listar e consultar detalhes de visitas em retrato e paisagem | Pendente |
| E5 | Robustez e validacao final | Estados amigaveis para hardware indisponivel e testes aprovados | Pendente |

## Sequencia de desenvolvimento

1. Configurar Expo e Jest; escrever o teste do calculo vetorial.
2. Implementar e testar a regra de bloqueio do acelerometro.
3. Implementar GPS com permissoes, disponibilidade e indicador de precisao.
4. Implementar o repositorio AsyncStorage com testes de CRUD.
5. Montar componentes, telas e navegacao.
6. Validar os fluxos offline, sensores indisponiveis e responsividade.
