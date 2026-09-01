/** Permite consultar detalhes e navegar pelo historico local de visitas tecnicas. */

import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { VisitaCard } from '../components/VisitaCard';
import { listarVisitas, obterVisita } from '../services/storage';

/**
 * Formata uma coordenada para leitura compacta no detalhe da visita.
 * Existe para manter latitude e longitude compreensiveis sem expor precisao excessiva.
 * Arredonda valores numericos para seis casas decimais e informa indisponibilidade para valores ausentes.
 */
function formatarCoordenada(valor) {
  return typeof valor === 'number' ? valor.toFixed(6) : 'indisponivel';
}

/**
 * Exibe o historico offline e o detalhe de uma visita selecionada.
 * Existe para permitir auditoria posterior mesmo sem conexao com a internet.
 * Recarrega os registros ao ganhar foco e busca o ID recebido pela navegacao quando houver um.
 */
export function HistoricoScreen({ route }) {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [selecionada, setSelecionada] = useState(null);
  const [visitas, setVisitas] = useState([]);
  const visitaId = route.params?.visitaId;

  /** Carrega as visitas e recupera o detalhe indicado pela aba de lista. */
  const carregarHistorico = useCallback(async () => {
    setCarregando(true);

    try {
      const registros = await listarVisitas();
      setVisitas(registros);
      setSelecionada(visitaId ? await obterVisita(visitaId) : null);
      setErro(null);
    } catch {
      setErro('Nao foi possivel carregar o historico de visitas.');
    } finally {
      setCarregando(false);
    }
  }, [visitaId]);

  /** Atualiza o historico sempre que a aba fica ativa ou recebe uma nova visita selecionada. */
  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
    }, [carregarHistorico]),
  );

  /** Renderiza uma visita e torna seu detalhe ativo ao toque. */
  const renderizarVisita = ({ item }) => <VisitaCard onPress={() => setSelecionada(item)} visita={item} />;

  if (carregando) {
    return <ActivityIndicator color="#276749" size="large" style={styles.carregando} />;
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Historico</Text>
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      {selecionada ? (
        <View style={styles.detalhe}>
          <Text style={styles.nome}>{selecionada.fazenda}</Text>
          <Text style={styles.detalheTexto}>{`Cultura: ${selecionada.cultura}`}</Text>
          <Text style={styles.detalheTexto}>{`GPS: ${formatarCoordenada(selecionada.coordenadas?.latitude)}, ${formatarCoordenada(selecionada.coordenadas?.longitude)}`}</Text>
          <Text style={styles.detalheTexto}>{`Observacoes: ${selecionada.observacoes || 'Nenhuma'}`}</Text>
        </View>
      ) : null}
      <FlatList
        data={visitas}
        keyExtractor={(visita) => visita.id}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum registro no historico.</Text>}
        renderItem={renderizarVisita}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carregando: { flex: 1 },
  detalhe: { backgroundColor: '#E7F3EA', borderRadius: 8, marginBottom: 16, padding: 14 },
  detalheTexto: { color: '#314437', fontSize: 14, marginTop: 5 },
  erro: { color: '#B42318', marginBottom: 12 },
  nome: { color: '#17231A', fontSize: 17, fontWeight: '700' },
  tela: { backgroundColor: '#F4F7F2', flex: 1, padding: 18 },
  titulo: { color: '#17231A', fontSize: 22, fontWeight: '700', marginBottom: 16 },
  vazio: { color: '#5C6B5F', fontSize: 16, marginTop: 48, textAlign: 'center' },
});
