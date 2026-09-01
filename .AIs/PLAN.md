# Plano: App de Registro de Visitas Técnicas Agrícolas (Pleno)

## Stack
- **Expo Managed** (SDK latest)
- **expo-sensors** — Acelerômetro
- **expo-location** — GPS + precisão
- **@react-native-async-storage/async-storage** — Persistência local
- **@react-navigation/native** + bottom-tabs — Navegação

## Estrutura de Pastas
```
Agricol/
├── App.js
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js         — Lista de visitas salvas
│   │   ├── NovaVisitaScreen.js   — Formulário nova visita (GPS + acelerômetro)
│   │   └── HistoricoScreen.js    — Detalhes de uma visita salva
│   ├── components/
│   │   ├── GpsIndicator.js       — Indicador de cor (verde/amarelo/vermelho)
│   │   ├── AcelerometroStatus.js — Exibe aceleração vetorial + trava
│   │   └── VisitaCard.js         — Card para lista
│   ├── hooks/
│   │   ├── useAcelerometro.js    — Hook do acelerômetro
│   │   └── useGps.js             — Hook do GPS + precisão
│   ├── services/
│   │   └── storage.js            — CRUD com AsyncStorage
│   └── utils/
│       └── aceleracao.js         — Cálculo da aceleração vetorial √(x²+y²+z²)
├── __tests__/
│   ├── aceleracao.test.js        — Teste do cálculo vetorial
│   ├── storage.test.js           — Teste do CRUD AsyncStorage
│   └── useAcelerometro.test.js   — Teste do hook (mock expo-sensors)
└── .env.example
```

## Funcionalidades

### 1. Acelerômetro (Pleno Core)
- Hook `useAcelerometro` escuta o sensor com intervalo de 100ms
- Calcula aceleração vetorial: `√(x² + y² + z²)` em g-force
- Se > **2.0g** → bloqueia envio do formulário + alerta "Instabilidade Física Detectada"
- Verifica `Accelerometer.isAvailableAsync()` antes de usar (RNF01)

### 2. GPS + Indicador de Precisão (RF02)
- Hook `useGps` usa `getCurrentPositionAsync({ accuracy: High })`
- `location.coords.accuracy` retorna metros de incerteza
- Componente `GpsIndicator` mostra:
  - 🟢 Verde: < 10m
  - 🟡 Amarelo: 10m – 30m
  - 🔴 Vermelho: > 30m ou indisponível

### 3. Persistência (RF01)
- `storage.js` com funções: `salvarVisita`, `listarVisitas`, `obterVisita`, `excluirVisita`
- Dados: id, data, fazenda, cultura, observações, coords GPS, acelerometria, timestamp
- JSON serializado no AsyncStorage

### 4. Telas
- **HomeScreen**: Lista de visitas com `FlatList`, botão "+"
- **NovaVisitaScreen**: Formulário (fazenda, cultura, observações) + GPS indicator + acelerômetro status + botão salvar (bloqueado se >2.0g)
- **HistoricoScreen**: Detalhes da visita

### 5. UI Responsiva (RNF02)
- Flexbox com `flex: 1`, `Dimensions` para adaptar
- Cards com `maxWidth` percentual

## Ordem de Implementação (TDD)
1. `aceleracao.test.js` → implementar `aceleracao.js`
2. `storage.test.js` → implementar `storage.js`
3. `useAcelerometro.test.js` → implementar `useAcelerometro.js`
4. Componentes (`GpsIndicator`, `AcelerometroStatus`, `VisitaCard`)
5. Hooks (`useGps`)
6. Telas (`HomeScreen`, `NovaVisitaScreen`, `HistoricoScreen`)
7. `App.js` com navegação

## Dependências
```json
{
  "expo": "~52",
  "expo-sensors": "~14",
  "expo-location": "~18",
  "@react-native-async-storage/async-storage": "~2",
  "@react-navigation/native": "^7",
  "@react-navigation/bottom-tabs": "^7",
  "react-native-screens": "~4",
  "react-native-safe-area-context": "~5"
}
```

## Checklist de Entrega
- [ ] Nível Pleno — Acelerômetro com trava >2.0g
- [ ] RF01 — Persistência local funcionando offline
- [ ] RF02 — Indicador visual de precisão de GPS
- [ ] RNF01 — Sem crashes com hardware indisponível
- [ ] RNF02 — Layout responsivo (portrait/landscape)
