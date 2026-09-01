/** Configura a transformacao Babel usada pelo Expo e pelos testes unitarios. */

/**
 * Informa ao Babel como converter o JavaScript do Expo para os testes e o bundle.
 * Existe para manter a sintaxe do aplicativo compativel com Jest e Metro.
 * Usa o preset oficial do Expo e armazena sua configuracao em cache.
 */
module.exports = (api) => {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
  };
};
