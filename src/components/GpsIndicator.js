/** Apresenta visualmente a qualidade da precisao de localizacao da visita. */

import { StyleSheet, Text, View } from 'react-native';

/**
 * Formata a margem de erro do GPS para leitura direta no formulario.
 * Existe para padronizar a informacao de precisao e tratar a ausencia de sinal sem texto tecnico.
 * Converte valores numericos em metros com uma casa decimal e usa um rotulo amigavel quando nao ha valor.
 */
function formatarPrecisao(precisao) {
  return typeof precisao === 'number' ? `${precisao.toFixed(1)} m` : 'indisponivel';
}

/**
 * Exibe a cor e o texto correspondentes ao nivel de precisao retornado pelo GPS.
 * Existe para dar feedback imediato sobre a confiabilidade da coordenada antes de salvar uma visita.
 * Combina o nivel calculado pelo hook com a margem de erro formatada em um bloco acessivel.
 */
export function GpsIndicator({ precisao, qualidade }) {
  const cor = qualidade?.cor ?? 'vermelho';
  const nivel = qualidade?.nivel ?? 'baixa';

  return (
    <View
      accessible
      accessibilityLabel={`Precisao ${nivel}: ${formatarPrecisao(precisao)}`}
      style={[styles.container, estilosPorCor[cor]]}
      testID="indicador-gps"
    >
      <View style={[styles.ponto, styles[`ponto${cor[0].toUpperCase()}${cor.slice(1)}`]]} />
      <Text style={styles.texto}>{`Precisao ${nivel}: ${formatarPrecisao(precisao)}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alerta: {
    backgroundColor: '#FFF3CD',
  },
  container: {
    alignItems: 'center',
    borderRadius: 6,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  erro: {
    backgroundColor: '#FCE2E2',
  },
  ponto: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  pontoAmarelo: {
    backgroundColor: '#B7791F',
  },
  pontoVerde: {
    backgroundColor: '#1F9D55',
  },
  pontoVermelho: {
    backgroundColor: '#C53030',
  },
  sucesso: {
    backgroundColor: '#DDF7E7',
  },
  texto: {
    color: '#202020',
    fontSize: 14,
  },
});

const estilosPorCor = {
  amarelo: styles.alerta,
  verde: styles.sucesso,
  vermelho: styles.erro,
};
