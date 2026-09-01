# Regras globais para agentes de IA

Estas regras valem para qualquer IA que trabalhe neste repositório, inclusive
Codex e OpenCode.

1. Antes de editar, informe os arquivos afetados e a natureza da mudança.
   Aguarde a aprovação explícita do usuário, exceto quando o pedido do usuário
   já autorizar inequivocamente a edição.
2. Nunca leia, edite, exponha ou versiona arquivos `.env`. Consulte apenas os
   respectivos `.env.example`.
3. Arquivos e funções novas devem ter comentários em português: no topo do
   arquivo, explique seu propósito; em cada função ou método, descreva o que
   faz, por que existe e como funciona.
4. Use TDD: escreva testes unitários antes da implementação. Uma funcionalidade
   só está completa após passar em `npm run test:unit` no serviço aplicável.
5. O formato de entrega se encaixa em pequenos commits que serao feitos pelo  programador e nao pela IA, e separados por pushs que serao as entregas de features prontas
6. O formato de entrega se encaixa em pequenos commits que serao feitos pelo  programador e nao pela IA, e separados por pushs que serao as entregas de features prontas