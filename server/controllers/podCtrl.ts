import * as fs from 'fs';
import * as path from 'path';
import BaseCtrl from './ibaseCtrl';

export default class PodCtrl implements BaseCtrl {
    // getting data for host 192.168.1.140
    getAll(req: any, res: any): void {
        // Getting Data for Nodes info
        const contents = fs.readFileSync(path.join(process.cwd(), '/server/sampleData/192-168-1-140.json'), 'utf-8');
        const hostData = JSON.parse(contents);
        const data = [];

        // extracting data, creating a json object and saving it in an array
        // tslint:disable-next-line:forin
        for (const i in hostData.results[0].series[0].values) {
            const nodeAddress = {};
            const memoryUsage = hostData.results[0].series[0].values[i][14];

            nodeAddress['nameSpace'] = hostData.results[0].series[0].values[i][12];
            nodeAddress['pod'] = hostData.results[0].series[0].values[i][11];
            nodeAddress['memoryUsage'] = `${memoryUsage.toPrecision(3)}%`;
            nodeAddress['upTime'] = 'No Data';

            // going thorugh the list and matching each pod with the first to get the correct uptime data
            for (const j in hostData.results[1].series[0].values) {
                if (nodeAddress['pod'] === (hostData.results[1].series[0].values[j][11])) {
                    const upTime = hostData.results[1].series[0].values[j][14] / (1000 * 60 * 60 * 24);
                    nodeAddress['upTime'] = `${upTime.toPrecision(3)} Days`;
                }
            }
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
