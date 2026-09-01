/** Centraliza regras puras relacionadas a leituras do acelerometro. */

/**
 * Calcula a intensidade total de uma leitura do acelerometro em g-force.
 * Existe para separar a regra matematica da integracao com o sensor e permitir testes deterministas.
 * Aplica o modulo euclidiano aos eixos x, y e z recebidos pelo Expo Sensors.
 */
export function calcularAceleracaoVetorial({ x, y, z }) {
  return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
}
