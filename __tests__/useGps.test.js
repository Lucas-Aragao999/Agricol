/** Especifica a obtencao segura da localizacao e da precisao do GPS. */

import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import * as Location from 'expo-location';
import { useGps } from '../src/hooks/useGps';

jest.mock('expo-location', () => ({
  Accuracy: { High: 4 },
  getCurrentPositionAsync: jest.fn(),
  requestForegroundPermissionsAsync: jest.fn(),
}));

let estadoAtual;

/**
 * Executa o hook dentro de uma arvore React para que os testes observem seu estado.
 * Existe porque hooks dependem do ciclo de vida de componentes para processar efeitos assincronos.
 * Copia o retorno do hook para uma variavel compartilhada e nao renderiza interface visual.
 */
function ObservadorDoGps() {
  estadoAtual = useGps();
  return null;
}

describe('useGps', () => {
  beforeEach(() => {
    estadoAtual = undefined;
    Location.requestForegroundPermissionsAsync.mockResolvedValue({ status: 'granted' });
    Location.getCurrentPositionAsync.mockResolvedValue({
      coords: {
        accuracy: 8.4,
        latitude: -23.5505,
        longitude: -46.6333,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('solicita permissao e obtem coordenadas com precisao alta', async () => {
    await act(async () => {
      TestRenderer.create(<ObservadorDoGps />);
    });

    expect(Location.getCurrentPositionAsync).toHaveBeenCalledWith({ accuracy: Location.Accuracy.High });
    expect(estadoAtual.coordenadas).toEqual({ latitude: -23.5505, longitude: -46.6333 });
    expect(estadoAtual.precisao).toBe(8.4);
    expect(estadoAtual.qualidade).toEqual({ cor: 'verde', nivel: 'alta' });
    expect(estadoAtual.erro).toBeNull();
  });

  it('mantem estado amigavel quando a permissao e negada', async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValue({ status: 'denied' });

    await act(async () => {
      TestRenderer.create(<ObservadorDoGps />);
    });

    expect(Location.getCurrentPositionAsync).not.toHaveBeenCalled();
    expect(estadoAtual.coordenadas).toBeNull();
    expect(estadoAtual.qualidade).toEqual({ cor: 'vermelho', nivel: 'baixa' });
    expect(estadoAtual.erro).toBe('Permissao de localizacao nao concedida.');
  });
});
