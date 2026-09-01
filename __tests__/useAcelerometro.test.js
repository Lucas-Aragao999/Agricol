/** Especifica o comportamento do hook que acompanha a estabilidade fisica da visita. */

import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { Accelerometer } from 'expo-sensors';
import { useAcelerometro } from '../src/hooks/useAcelerometro';

jest.mock('expo-sensors', () => ({
  Accelerometer: {
    addListener: jest.fn(),
    isAvailableAsync: jest.fn(),
    setUpdateInterval: jest.fn(),
  },
}));

let estadoAtual;

/**
 * Renderiza o hook para permitir a inspecao de seu estado nos testes.
 * Existe porque hooks precisam de uma arvore React para executar seus efeitos.
 * Atualiza a variavel compartilhada a cada renderizacao e nao produz interface visual.
 */
function ObservadorDoAcelerometro() {
  estadoAtual = useAcelerometro();
  return null;
}

describe('useAcelerometro', () => {
  let callbackDeLeitura;
  let removerAssinatura;

  beforeEach(() => {
    callbackDeLeitura = undefined;
    removerAssinatura = jest.fn();
    estadoAtual = undefined;
    Accelerometer.isAvailableAsync.mockResolvedValue(true);
    Accelerometer.addListener.mockImplementation((callback) => {
      callbackDeLeitura = callback;
      return { remove: removerAssinatura };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('agrega a leitura do sensor e trava o envio acima de 2.0g', async () => {
    let arvore;

    await act(async () => {
      arvore = TestRenderer.create(<ObservadorDoAcelerometro />);
    });

    expect(Accelerometer.setUpdateInterval).toHaveBeenCalledWith(100);

    await act(async () => {
      callbackDeLeitura({ x: 1.5, y: 1.5, z: 1.5 });
    });

    expect(estadoAtual.aceleracao).toBeCloseTo(2.598, 3);
    expect(estadoAtual.estaInstavel).toBe(true);
    expect(estadoAtual.bloqueiaEnvio).toBe(true);

    act(() => {
      arvore.unmount();
    });

    expect(removerAssinatura).toHaveBeenCalledTimes(1);
  });

  it('permite o envio quando a leitura e exatamente 2.0g', async () => {
    let arvore;

    await act(async () => {
      arvore = TestRenderer.create(<ObservadorDoAcelerometro />);
    });

    await act(async () => {
      callbackDeLeitura({ x: 2, y: 0, z: 0 });
    });

    expect(estadoAtual.estaInstavel).toBe(false);
    expect(estadoAtual.bloqueiaEnvio).toBe(false);

    act(() => {
      arvore.unmount();
    });
  });

  it('exibe estado seguro quando o acelerometro nao esta disponivel', async () => {
    Accelerometer.isAvailableAsync.mockResolvedValue(false);
    let arvore;

    await act(async () => {
      arvore = TestRenderer.create(<ObservadorDoAcelerometro />);
    });

    expect(estadoAtual.disponivel).toBe(false);
    expect(estadoAtual.bloqueiaEnvio).toBe(false);
    expect(estadoAtual.erro).toBe('Acelerometro indisponivel neste dispositivo.');
    expect(Accelerometer.addListener).not.toHaveBeenCalled();

    act(() => {
      arvore.unmount();
    });
  });
});
