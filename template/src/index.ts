import { Application, HistoryMode, withImport } from '@codixjs/codix';
import { Client, ClientProvider } from '@codixjs/fetch';
export default function(app: Application<HistoryMode>) {
  const client = new Client();
  if (typeof window !== 'undefined' && window.INITIALIZE_STATE) {
    client.initialize(window.INITIALIZE_STATE);
  }
  app.use(ClientProvider, { client });
  const welcome = app.bind('/', ...withImport(() => import('./pages/index/index'), { fallback: 'loading...' }));
  return {
    welcome,
    client,
  }
}