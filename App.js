/** Inicializa a navegacao principal do aplicativo de visitas tecnicas agricolas. */

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './src/screens/HomeScreen';
import { HistoricoScreen } from './src/screens/HistoricoScreen';
import { NovaVisitaScreen } from './src/screens/NovaVisitaScreen';

const Abas = createBottomTabNavigator();

/**
 * Monta as abas que organizam o fluxo principal do aplicativo.
 * Existe para permitir que o tecnico alterne rapidamente entre visitas, cadastro e historico.
 * Encapsula as tres telas em um NavigationContainer com rotulos em portugues.
 */
export default function App() {
  return (
    <NavigationContainer>
      <Abas.Navigator screenOptions={{ headerTitleAlign: 'center', tabBarActiveTintColor: '#276749' }}>
        <Abas.Screen component={HomeScreen} name="Visitas" options={{ title: 'Visitas' }} />
        <Abas.Screen component={NovaVisitaScreen} name="Nova visita" options={{ title: 'Nova visita' }} />
        <Abas.Screen component={HistoricoScreen} name="Historico" options={{ title: 'Historico' }} />
      </Abas.Navigator>
    </NavigationContainer>
  );
}
