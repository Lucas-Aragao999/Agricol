/** Centraliza regras puras para transformar a precisao do GPS em feedback visual. */

/**
 * Classifica a precisao do GPS conforme os limites definidos para a visita tecnica.
 * Existe para manter a regra visual consistente entre telas e facilitar sua validacao isolada.
 * Recebe a margem de erro em metros e devolve a cor e o nivel que a interface deve apresentar.
 */
export function classificarPrecisaoGps(precisao) {
  if (typeof precisao !== 'number' || !Number.isFinite(precisao) || precisao > 30) {
    return { cor: 'vermelho', nivel: 'baixa' };
  }

  if (precisao >= 10) {
    return { cor: 'amarelo', nivel: 'media' };
  }

  return { cor: 'verde', nivel: 'alta' };
}
