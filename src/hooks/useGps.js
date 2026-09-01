/** Disponibiliza a localizacao atual e seu nivel de precisao para registros de visitas. */

import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { classificarPrecisaoGps } from '../utils/gps';

const QUALIDADE_INDISPONIVEL = { cor: 'vermelho', nivel: 'baixa' };

/**
 * Obtem a localizacao do dispositivo e informa a qualidade de sua precisao.
 * Existe para concentrar permissao, leitura do GPS e degradacao amigavel fora das telas.
 * Solicita acesso em primeiro plano e busca a posicao em alta precisao, sem atualizar estado apos desmontagem.
 */
export function useGps() {
  const [coordenadas, setCoordenadas] = useState(null);
  const [erro, setErro] = useState(null);
  const [precisao, setPrecisao] = useState(null);
  const [qualidade, setQualidade] = useState(QUALIDADE_INDISPONIVEL);

  /** Inicializa a leitura do GPS uma vez durante o ciclo de vida do componente. */
  useEffect(() => {
    let estaAtivo = true;

    /** Solicita a permissao e transforma a resposta do GPS em estado consumivel pela interface. */
    async function obterLocalizacao() {
      try {
        const permissao = await Location.requestForegroundPermissionsAsync();

        if (!estaAtivo) {
          return;
        }

        if (permissao.status !== 'granted') {
          setErro('Permissao de localizacao nao concedida.');
          return;
        }

        const localizacao = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });

        if (!estaAtivo) {
          return;
        }

        const { accuracy, latitude, longitude } = localizacao.coords;
        setCoordenadas({ latitude, longitude });
        setPrecisao(accuracy);
        setQualidade(classificarPrecisaoGps(accuracy));
        setErro(null);
      } catch {
        if (estaAtivo) {
          setErro('Nao foi possivel obter a localizacao. Verifique se o GPS esta ativo.');
        }
      }
    }

    obterLocalizacao();

    return () => {
      estaAtivo = false;
    };
  }, []);

  return { coordenadas, erro, precisao, qualidade };
}
