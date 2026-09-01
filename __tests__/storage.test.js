/** Especifica a persistencia local e offline dos registros de visitas tecnicas. */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { excluirVisita, listarVisitas, obterVisita, salvarVisita } from '../src/services/storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const CHAVE_VISITAS = '@agricol/visitas';
const visitaA = {
  cultura: 'Soja',
  data: '2026-09-01',
  fazenda: 'Fazenda Horizonte',
  id: 'visita-a',
};
const visitaB = {
  cultura: 'Milho',
  data: '2026-09-02',
  fazenda: 'Sitio Verde',
  id: 'visita-b',
};

describe('storage de visitas', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockResolvedValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('retorna uma lista vazia quando nao ha visitas salvas', async () => {
    await expect(listarVisitas()).resolves.toEqual([]);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(CHAVE_VISITAS);
  });

  it('salva uma nova visita no armazenamento local', async () => {
    await expect(salvarVisita(visitaA)).resolves.toEqual(visitaA);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(CHAVE_VISITAS, JSON.stringify([visitaA]));
  });

  it('atualiza uma visita existente sem duplicar seu identificador', async () => {
    const visitaAtualizada = { ...visitaA, cultura: 'Cafe' };
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify([visitaA, visitaB]));

    await expect(salvarVisita(visitaAtualizada)).resolves.toEqual(visitaAtualizada);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      CHAVE_VISITAS,
      JSON.stringify([visitaAtualizada, visitaB]),
    );
  });

  it('busca uma visita por identificador', async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify([visitaA, visitaB]));

    await expect(obterVisita('visita-b')).resolves.toEqual(visitaB);
    await expect(obterVisita('nao-existe')).resolves.toBeNull();
  });

  it('exclui a visita solicitada e informa se ela existia', async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify([visitaA, visitaB]));

    await expect(excluirVisita('visita-a')).resolves.toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(CHAVE_VISITAS, JSON.stringify([visitaB]));
  });
});
