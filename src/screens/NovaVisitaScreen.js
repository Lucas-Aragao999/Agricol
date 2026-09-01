/** Permite registrar uma nova visita tecnica com contexto de GPS e estabilidade fisica. */

import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { GpsIndicator } from '../components/GpsIndicator';
import { useAcelerometro } from '../hooks/useAcelerometro';
import { useGps } from '../hooks/useGps';
import { salvarVisita } from '../services/storage';

/**
 * Registra uma visita e impede conclusao quando o dispositivo esta instavel.
 * Existe para reunir dados do formulario, GPS e acelerometro em um unico registro offline.
 * Controla os campos locais, apresenta os estados dos sensores e persiste uma visita validada no AsyncStorage.
 */
export function NovaVisitaScreen({ navigation }) {
  const [cultura, setCultura] = useState('');
  const [fazenda, setFazenda] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [salvando, setSalvando] = useState(false);
  const acelerometro = useAcelerometro();
  const gps = useGps();

  /** Valida e persiste o formulario, respeitando a trava de seguranca do acelerometro. */
  async function concluirVisita() {
    if (!fazenda.trim() || !cultura.trim()) {
      Alert.alert('Dados obrigatorios', 'Informe a fazenda e a cultura antes de salvar.');
      return;
    }

    if (acelerometro.bloqueiaEnvio) {
      Alert.alert('Instabilidade Fisica Detectada', 'Aguarde o dispositivo estabilizar para concluir a visita.');
      return;
    }

    setSalvando(true);

    try {
      const agora = new Date();
      const visita = {
        aceleracao: acelerometro.aceleracao,
        coordenadas: gps.coordenadas,
        cultura: cultura.trim(),
        data: agora.toISOString().slice(0, 10),
        fazenda: fazenda.trim(),
        id: `${agora.getTime()}`,
        observacoes: observacoes.trim(),
        precisaoGps: gps.precisao,
        timestamp: agora.toISOString(),
      };

      await salvarVisita(visita);
      setCultura('');
      setFazenda('');
      setObservacoes('');
      Alert.alert('Visita salva', 'O registro foi salvo neste dispositivo.');
      navigation.navigate('Visitas');
    } catch {
      Alert.alert('Falha ao salvar', 'Nao foi possivel salvar a visita. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.conteudo} style={styles.tela}>
      <Text style={styles.titulo}>Nova visita</Text>
      <Text style={styles.rotulo}>Fazenda</Text>
      <TextInput onChangeText={setFazenda} placeholder="Nome da fazenda" style={styles.campo} value={fazenda} />
      <Text style={styles.rotulo}>Cultura</Text>
      <TextInput onChangeText={setCultura} placeholder="Ex.: Soja" style={styles.campo} value={cultura} />
      <Text style={styles.rotulo}>Observacoes</Text>
      <TextInput multiline onChangeText={setObservacoes} placeholder="Condicoes observadas na visita" style={[styles.campo, styles.observacoes]} value={observacoes} />
      <View style={styles.sensor}>
        <Text style={styles.sensorTitulo}>Localizacao</Text>
        <GpsIndicator precisao={gps.precisao} qualidade={gps.qualidade} />
        {gps.erro ? <Text style={styles.aviso}>{gps.erro}</Text> : null}
      </View>
      <View style={styles.sensor}>
        <Text style={styles.sensorTitulo}>Estabilidade do dispositivo</Text>
        <Text style={styles.leitura}>{acelerometro.aceleracao === null ? 'Aguardando leitura...' : `${acelerometro.aceleracao.toFixed(2)} g`}</Text>
        {acelerometro.erro ? <Text style={styles.aviso}>{acelerometro.erro}</Text> : null}
        {acelerometro.estaInstavel ? <Text style={styles.alerta}>Movimento intenso detectado. O envio esta bloqueado.</Text> : null}
      </View>
      <Pressable disabled={salvando} onPress={concluirVisita} style={[styles.botao, salvando && styles.botaoDesabilitado]}>
        <Text style={styles.botaoTexto}>{salvando ? 'Salvando...' : 'Salvar visita'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  alerta: { color: '#B42318', fontSize: 13, marginTop: 8 },
  aviso: { color: '#7A4A00', fontSize: 13, marginTop: 8 },
  botao: { alignItems: 'center', backgroundColor: '#276749', borderRadius: 6, marginTop: 12, padding: 15 },
  botaoDesabilitado: { backgroundColor: '#8FA696' },
  botaoTexto: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  campo: { backgroundColor: '#FFFFFF', borderColor: '#C9D6CC', borderRadius: 6, borderWidth: 1, fontSize: 16, marginBottom: 14, padding: 12 },
  conteudo: { padding: 18, paddingBottom: 32 },
  leitura: { color: '#314437', fontSize: 16 },
  observacoes: { minHeight: 90, textAlignVertical: 'top' },
  rotulo: { color: '#314437', fontSize: 14, fontWeight: '700', marginBottom: 6 },
  sensor: { backgroundColor: '#EAF1EB', borderRadius: 8, marginBottom: 14, padding: 14 },
  sensorTitulo: { color: '#17231A', fontSize: 16, fontWeight: '700', marginBottom: 9 },
  tela: { backgroundColor: '#F4F7F2', flex: 1 },
  titulo: { color: '#17231A', fontSize: 22, fontWeight: '700', marginBottom: 18 },
});
