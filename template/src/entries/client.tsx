import '../style.less';
import React from 'react';
import { Application, PopstateHistoryMode } from '@codixjs/codix';
import createRouters from '../index';
import { hydrateRoot } from 'react-dom/client';

const app = new Application(PopstateHistoryMode);
export const routers = createRouters(app);
const { Bootstrap } = app.build();

window.onload = () => {
  hydrateRoot(
    document.getElementById('root'),
    <Bootstrap pathes={routers}>404 Not Found</Bootstrap>
  );
}
