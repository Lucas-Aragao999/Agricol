/** Disponibiliza leituras do acelerometro para proteger o encerramento de visitas. */

import { useEffect, useMemo, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import { calcularAceleracaoVetorial } from '../utils/aceleracao';

const INTERVALO_DE_LEITURA_MS = 100;
const LIMITE_DE_ESTABILIDADE_G = 2;

/**
 * Monitora o acelerometro e informa se o dispositivo esta instavel para salvar uma visita.
 * Existe para concentrar a integracao com o hardware e aplicar a regra de seguranca em um unico lugar.
 * Verifica a disponibilidade do sensor, assina leituras periodicas e remove a assinatura ao desmontar.
 */
export function useAcelerometro() {
  const [aceleracao, setAceleracao] = useState(null);
  const [disponivel, setDisponivel] = useState(null);
  const [erro, setErro] = useState(null);

  /** Inicia e encerra o monitoramento sem atualizar estado apos a desmontagem do componente. */
  useEffect(() => {
    let estaAtivo = true;
    let assinatura;

    /** Configura o sensor quando o dispositivo oferece suporte ao acelerometro. */
    async function iniciarMonitoramento() {
      try {
        const sensorDisponivel = await Accelerometer.isAvailableAsync();

        if (!estaAtivo) {
          return;
        }

        setDisponivel(sensorDisponivel);

        if (!sensorDisponivel) {
          setErro('Acelerometro indisponivel neste dispositivo.');
          return;
        }

        Accelerometer.setUpdateInterval(INTERVALO_DE_LEITURA_MS);
        assinatura = Accelerometer.addListener((leitura) => {
          if (estaAtivo) {
            setAceleracao(calcularAceleracaoVetorial(leitura));
          }
        });
      } catch {
        if (estaAtivo) {
          setDisponivel(false);
          setErro('Nao foi possivel acessar o acelerometro.');
        }
      }
    }

    iniciarMonitoramento();

    return () => {
      estaAtivo = false;
      assinatura?.remove();
    };
  }, []);

  /** Deriva a trava de seguranca da ultima intensidade vetorial recebida. */
  const estaInstavel = useMemo(() => aceleracao !== null && aceleracao > LIMITE_DE_ESTABILIDADE_G, [aceleracao]);

  return {
    aceleracao,
    bloqueiaEnvio: estaInstavel,
    disponivel,
    erro,
    estaInstavel,
  };
}
