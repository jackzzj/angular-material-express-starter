import * as fs from 'fs';
import * as path from 'path';
import BaseCtrl from './ibaseCtrl';

export default class NodeCtrl implements BaseCtrl {
    getAll(rreq: any, res: any): void {
        const contents = fs.readFileSync(path.join(process.cwd(), '/server/sampleData/uptime.json'), 'utf-8');
        // creating a json obj
        const nodesData = JSON.parse(contents);

        // extracting the AWS zone from the string
        // let str = nodesData.results[0].series[0].values;//[1][6];
        // let res = str.split(':');
        const data = [];

        // extracting data, creating a json object and saving it in an array
        // tslint:disable-next-line:forin
        for (const i in nodesData.results[0].series[0].values) {
            const nodeAddress = {};
            const uptime = nodesData.results[0].series[0].values[i][14] / (1000 * 60 * 60 * 24);
            const memoryUsage = nodesData.results[1].series[0].values[i][14];
            const diskSpace = nodesData.results[2].series[0].values[i][8];

            nodeAddress['nodeIP'] = nodesData.results[0].series[0].values[i][4];
            nodeAddress['uptime'] = `${uptime.toPrecision(2)} Days`;
            nodeAddress['zone'] = (nodesData.results[0].series[0].values[i][6]).split(':')[5];
            nodeAddress['memoryUsage'] = `${memoryUsage.toPrecision(2)}%`;
            nodeAddress['diskSpace'] = `${diskSpace.toPrecision(2)}%`;

            // pushing the json data into the array
            data.push(nodeAddress);
        }
        res.json({'data': data});
    }
    count(req: any, res: any): void {
        throw new Error('Method not implemented.');
    }
    insert(req: any, res: any): void {
        throw new Error('Method not implemented.');
    }
    get(req: any, res: any): void {
        throw new Error('Method not implemented.');
    }
    update(req: any, res: any): void {
        throw new Error('Method not implemented.');
    }
    delete(req: any, res: any): void {
        throw new Error('Method not implemented.');
    }
}
