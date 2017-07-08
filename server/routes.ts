import * as express from 'express';
import NodeCtrl from './controllers/nodeCtrl';
import PodCtrl from './controllers/podCtrl';

export default function setRoutes(app) {

    const router = express.Router();

    const nodeCtrl = new NodeCtrl();
    const podCtrl = new PodCtrl();

    router.route('/nodes').get(nodeCtrl.getAll);
    router.route('/pods').get(podCtrl.getAll);

    // Apply the routes to our application with the prefix /api
    app.use('/api', router);

}
