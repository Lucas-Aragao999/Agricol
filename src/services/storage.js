/** Gerencia a persistencia local e offline das visitas tecnicas no dispositivo. */

import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_VISITAS = '@agricol/visitas';

/**
 * Lista todas as visitas persistidas no dispositivo.
 * Existe para concentrar a desserializacao e impedir que telas conhecam a chave interna de armazenamento.
 * Le o JSON do AsyncStorage e devolve uma lista vazia quando ainda nao ha registros ou os dados nao sao uma lista.
 */
export async function listarVisitas() {
  const valorArmazenado = await AsyncStorage.getItem(CHAVE_VISITAS);

  if (!valorArmazenado) {
    return [];
  }

  const visitas = JSON.parse(valorArmazenado);
  return Array.isArray(visitas) ? visitas : [];
}

/**
 * Salva uma visita nova ou atualiza outra com o mesmo identificador.
 * Existe para preservar um unico registro por visita e permitir correcoes sem gerar duplicatas.
 * Carrega os dados atuais, substitui a visita de mesmo ID ou a adiciona ao inicio da lista e persiste o JSON atualizado.
 */
export async function salvarVisita(visita) {
  const visitas = await listarVisitas();
  const indiceDaVisita = visitas.findIndex((visitaSalva) => visitaSalva.id === visita.id);
  const visitasAtualizadas = indiceDaVisita === -1
    ? [visita, ...visitas]
    : visitas.map((visitaSalva) => (visitaSalva.id === visita.id ? visita : visitaSalva));

  await AsyncStorage.setItem(CHAVE_VISITAS, JSON.stringify(visitasAtualizadas));
  return visita;
}

/**
 * Busca uma visita pelo seu identificador local.
 * Existe para que a tela de detalhes acesse apenas o registro solicitado sem repetir a regra de busca.
 * Percorre a lista persistida e devolve a visita correspondente ou nulo quando ela nao existe.
 */
export async function obterVisita(id) {
  const visitas = await listarVisitas();
  return visitas.find((visita) => visita.id === id) ?? null;
}

/**
 * Remove uma visita persistida e informa se o registro estava presente.
 * Existe para permitir confirmacao de exclusao pela interface sem expor a estrutura interna do armazenamento.
 * Filtra a lista pelo ID, grava a lista resultante e compara os tamanhos antes e depois da operacao.
 */
export async function excluirVisita(id) {
  const visitas = await listarVisitas();
  const visitasAtualizadas = visitas.filter((visita) => visita.id !== id);
  const visitaExistia = visitasAtualizadas.length !== visitas.length;

  await AsyncStorage.setItem(CHAVE_VISITAS, JSON.stringify(visitasAtualizadas));
  return visitaExistia;
}
