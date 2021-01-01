import chalk from 'chalk';

export class MessageManager {

    static format(msg: string, vars: {
        [varName: string]: number | string | boolean;
    }): string {
        for (let v in vars) {
            msg = msg.replace(`%${v}%`, `${vars[v]}`);
        }

        return msg;
    }
}
