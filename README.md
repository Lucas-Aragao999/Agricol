<!-- Documenta o objetivo, a execucao e o estado atual do aplicativo Agricol. -->

# Agricol

Aplicativo mobile para registrar visitas tecnicas agricolas com funcionamento offline e uso de recursos do dispositivo.

## Objetivo

O projeto atende ao desafio de nivel Pleno da atividade pratica: monitorar a estabilidade fisica do dispositivo durante o encerramento de uma visita. Leituras acima de `2.0g` devem bloquear o envio para evitar registros durante movimento intenso.

## Funcionalidades

- Calculo da aceleracao vetorial a partir dos eixos `x`, `y` e `z`.
- Monitoramento do acelerometro a cada 100 ms.
- Indicacao de instabilidade e bloqueio de envio acima de `2.0g`.
- Tratamento amigavel quando o acelerometro nao esta disponivel.
- Testes unitarios para a regra matematica e o hook do sensor.

## Tecnologias

- Expo e React Native
- Expo Sensors
- Expo Location
- AsyncStorage
- Jest e React Test Renderer
- pnpm

## Pre-requisitos

- Node.js 20 ou superior
- pnpm 9 ou superior
- Expo Go em um dispositivo Android ou iOS para testes com sensores reais

## Comandos

Instale as dependencias:

```bash
pnpm install
```

Execute os testes unitarios:

```bash
pnpm run test:unit
```

Quando as telas forem adicionadas, inicie o Expo com:

```bash
pnpm start
```

## Estado Atual

A base do projeto e a telemetria do acelerometro estao implementadas e cobertas por testes. As proximas etapas sao GPS com indicador de precisao, persistencia local de visitas e as telas do fluxo de cadastro e historico.

O planejamento completo esta em [.AIs/ROADMAP.md](.AIs/ROADMAP.md).
