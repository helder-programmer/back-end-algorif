import App from './app';

App.listen(process.env.SERVER_PORT, () => {
    console.log('Servidor Rodando');
});