import { MEM_SIZE, TABLE_SIZE } from './constants';

export const buffer = new ArrayBuffer(MEM_SIZE);
export const mem = new DataView(buffer);

export const table = new Uint32Array(TABLE_SIZE);