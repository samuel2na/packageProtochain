import hash256 from 'crypto-js/sha256';
import Validation from './validation';
/**
 * Block class
 */
export default class Block {
    index: number;
    timestamp: number;
    hash: string;
    previousHash: string;
    data: string;

    /**
     * Constructor -  Create a new block
     * @param index - The block index
     * @param previousHash - The previous block hash
     * @param data - The block data
     */
    constructor(index: number, previousHash: string, data: string) {
        this.index = index;
        this.timestamp = Date.now();
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.getHash();
    }

    getHash(): string {
        return hash256(this.index + this.previousHash + this.timestamp + this.data).toString();
    }

    /**
     * isValid - Check if the block is valid
     * @returns Returns true if the block is valid
     */
    isValidBlock(previousHash: string, previousIndex: number): Validation {
        if(previousIndex !== (this.index - 1)) return new Validation(false, `Invalid index: ${this.index}`);
        // compara o hash atual com o hash gerado, precisa ser igual levando em consideração todo o conteúdo do bloco
        if(this.hash !== this.getHash()) return new Validation(false, `Invalid hash: ${this.hash}`); 
        if(this.previousHash !== previousHash) return new Validation(false, `Invalid previous hash: ${this.previousHash}`);
        if(this.timestamp <= 0) return new Validation(false, `Invalid timestamp: ${this.timestamp}`);
        if(this.data.length === 0) return new Validation(false, `Invalid data: ${this.data}`);
        return new Validation();
    }
}