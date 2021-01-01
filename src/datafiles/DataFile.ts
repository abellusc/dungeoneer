import { existsSync, writeFileSync, readFileSync } from 'fs';
import _ from 'lodash';
import lzutf8 = require('lzutf8');


const EVEN_VAL = 2; // data file shift when the index is even
const ODD_VAL = 4; // data file shift when the index is odd

export abstract class DataFile extends Uint8Array {
    constructor(private readonly filePath: string) {
        super();
    }

    private encode(rawDataBuffer: Uint8Array): string[] {
        const copy: any = _.merge(new Uint8Array(), rawDataBuffer);
        return copy
            .map((element: number, index: number) => (element << (index % 2 === 0 ? EVEN_VAL : ODD_VAL)))
            .map((element: number) => element.toString(15));
    }

    private compress(dataString: string): string {
        return lzutf8.compress(dataString, {
            inputEncoding: 'String',
            outputEncoding: 'BinaryString',
        });
    }

    private decompress(dataString: string): string {
        return lzutf8.decompress(dataString, {
            inputEncoding: 'BinaryString',
            outputEncoding: 'String'
        })
    }

    private decode(encodedDataBuffer: Uint8Array): Uint8Array {
        const rawData = encodedDataBuffer.map((element: number, index: number) => (element >> (index % 2 === 0 ? EVEN_VAL : ODD_VAL)));
        return rawData;
    }

    private jsonToBuffer(json: string): Buffer {
        const buf = Buffer.alloc(json.length);
        buf.write(json, 'hex');

        return buf;
    }

    public save(data: any): boolean {
        try {
            if (typeof data !== 'object')
                throw new TypeError('data provided to save should be a json serializable object');
            
            const buf = this.jsonToBuffer(JSON.stringify(data));
            const writeData = Buffer.from([...this.encode(buf)]);

            if (writeData) {
                const writeDataCompressed = this.compress(writeData.toString());
                writeFileSync(this.filePath, Buffer.from(writeDataCompressed));
                return true;
            }

            return false;
        } catch {
            return false;
        }
    }

    public load(): any {
        try {
            if (!existsSync(this.filePath))
                throw new ReferenceError('requested data file does not exist: ' + this.filePath);

            const loaded = readFileSync(this.filePath).toString();
            const encoded = this.decompress(loaded.toString());
            const decodedBuf = this.decode(Buffer.from(encoded));
            const obj = JSON.parse(decodedBuf.toString()) as any;

            if (!obj)
                throw new ReferenceError('resultant object is undefined');

            return obj;
        } catch {
            return null;
        }
    }
}
