import { ServerSiderRender } from '@codixjs/server';
import Html from '../html';
import createRouters from '../index';

export default ServerSiderRender({
  html: Html,
  routers: createRouters,
  onAllReady(req, res, obj) {
    const client = obj.client;
    res.write(`<script>window.INITIALIZE_STATE = ${JSON.stringify(client.toJSON())}</script>`);
  }
})