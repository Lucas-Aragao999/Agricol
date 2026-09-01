# Resumo — Atividade Prática: Registro de Visitas Técnicas Agrícolas

**Papel:** Engenheiro(a) de Software Mobile
**Objetivo:** Evoluir o app de Registro de Visitas Técnicas Agrícolas (ou integrar as soluções no projeto próprio de curso), provando domínio sobre recursos de hardware do dispositivo.

> A nota final é proporcional à complexidade do nível escolhido e à qualidade da entrega.

---

## 1. Escolha do Nível de Desafio

| Nível | Desafio | Missão |
|---|---|---|
| **Júnior** | Tratamento avançado de permissões negadas | Validar o retorno da permissão da câmera. Se `canAskAgain: false`, não exibir alerta genérico — orientar o usuário, com instruções claras, a abrir manualmente as configurações do sistema operacional. |
| **Pleno** | Telemetria com Acelerômetro | Implementar trava de segurança por movimento durante o fechamento da auditoria: usar o sensor `Accelerometer` para calcular a aceleração vetorial agregada. Se ultrapassar **2.0g**, bloquear o envio com o alerta *"Instabilidade Física Detectada"*. |
| **Sênior** | Otimização e filtragem em massa (>5.000 registros) | Refatorar a busca de contatos para: (a) carregamento paginado sob demanda (scroll infinito com `pageSize`/`pageOffset`); (b) campo de busca (`TextInput`) que filtre nomes na consulta nativa; (c) `FlatList` pura com reuso de memória, evitando vazamento de RAM e lags. |

---

## 2. Requisitos Adicionais do Projeto

### Requisitos Funcionais (RF)

- **RF01 — Histórico Local e Persistência:** registros de auditoria/visita concluídos devem ser salvos localmente (`AsyncStorage` ou `SQLite`), permitindo consulta offline de visitas passadas.
- **RF02 — Feedback Visual de Precisão de GPS:** indicador de cor conforme a precisão do sinal:
  - 🟢 **Verde** — alta precisão (< 10 m)
  - 🟡 **Amarelo** — média precisão (10 m – 30 m)
  - 🔴 **Vermelho** — baixa precisão (> 30 m)

### Requisitos Não Funcionais (RNF)

- **RNF01 — Degradação Graciosa e Tratamento de Erros:** o app não pode travar se um sensor/recurso estiver indisponível (GPS desligado, ausência de câmera, etc.); deve exibir mensagens amigáveis sobre o estado do sistema.
- **RNF02 — UI/UX Responsiva:** layout deve se adaptar a diferentes tamanhos de tela e orientações (Portrait/Landscape) sem quebrar cards ou botões.

---

## 3. Checklist de Entrega

- [ ] Nível de desafio escolhido e implementado (Júnior / Pleno / Sênior)
- [ ] RF01 — Persistência local funcionando offline
- [ ] RF02 — Indicador visual de precisão de GPS
- [ ] RNF01 — Sem crashes com hardware indisponível
- [ ] RNF02 — Layout responsivo (portrait/landscape)