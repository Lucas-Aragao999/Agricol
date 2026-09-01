/** Exibe o resumo de uma visita tecnica em listas de visitas e historico. */

import { Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * Formata uma data ISO para o padrao de leitura brasileiro sem deslocamento de fuso horario.
 * Existe para que a data salva localmente seja apresentada igual em todos os dispositivos.
 * Separa ano, mes e dia da string ISO e reorganiza os tres campos para exibicao.
 */
function formatarData(data) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

/**
 * Renderiza uma visita como item acionavel para abrir seus detalhes.
 * Existe para reutilizar o mesmo resumo em telas diferentes e manter a lista consistente.
 * Mostra os campos principais e delega o toque ao callback fornecido pela tela pai.
 */
export function VisitaCard({ onPress, visita }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <View style={styles.cabecalho}>
        <Text numberOfLines={1} style={styles.fazenda}>{visita.fazenda}</Text>
        <Text style={styles.data}>{formatarData(visita.data)}</Text>
      </View>
      <Text style={styles.cultura}>{visita.cultura}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D8E2D8',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  cultura: {
    color: '#4A5568',
    fontSize: 14,
    marginTop: 6,
  },
  data: {
    color: '#5C6B5F',
    fontSize: 13,
  },
  fazenda: {
    color: '#17231A',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
});
