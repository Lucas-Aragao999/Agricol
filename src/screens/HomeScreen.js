/** Lista as visitas salvas localmente e permite abrir seus detalhes. */

import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { VisitaCard } from '../components/VisitaCard';
import { listarVisitas } from '../services/storage';

/**
 * Mostra as visitas locais como ponto inicial do fluxo do tecnico.
 * Existe para tornar os registros offline imediatamente acessiveis ao abrir o aplicativo.
 * Recarrega a lista ao receber foco e encaminha o ID selecionado para a aba de historico.
 */
export function HomeScreen({ navigation }) {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [visitas, setVisitas] = useState([]);

  /** Carrega a lista local e converte falhas de armazenamento em uma mensagem amigavel. */
  const carregarVisitas = useCallback(async () => {
    setCarregando(true);

    try {
      setVisitas(await listarVisitas());
      setErro(null);
    } catch {
      setErro('Nao foi possivel carregar as visitas salvas.');
    } finally {
      setCarregando(false);
    }
  }, []);

  /** Recarrega os registros quando a aba volta a ficar visivel. */
  useFocusEffect(
    useCallback(() => {
      carregarVisitas();
    }, [carregarVisitas]),
  );

  /** Renderiza cada visita e abre o detalhe correspondente na aba de historico. */
  const renderizarVisita = ({ item }) => (
    <VisitaCard onPress={() => navigation.navigate('Historico', { visitaId: item.id })} visita={item} />
  );

  if (carregando) {
    return <ActivityIndicator color="#276749" size="large" style={styles.carregando} />;
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Visitas registradas</Text>
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      <FlatList
        contentContainerStyle={visitas.length === 0 ? styles.listaVazia : styles.lista}
        data={visitas}
        keyExtractor={(visita) => visita.id}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma visita salva ainda.</Text>}
        renderItem={renderizarVisita}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carregando: { flex: 1 },
  erro: { color: '#B42318', marginBottom: 12 },
  lista: { paddingBottom: 20 },
  listaVazia: { flexGrow: 1, justifyContent: 'center' },
  tela: { backgroundColor: '#F4F7F2', flex: 1, padding: 18 },
  titulo: { color: '#17231A', fontSize: 22, fontWeight: '700', marginBottom: 16 },
  vazio: { color: '#5C6B5F', fontSize: 16, textAlign: 'center' },
});
