/**
 * Block class
 */
export default class Block {
    index: number;
    hash: string;

    /**
     * Constructor -  Create a new block
     * @param index - The block index
     * @param hash - The block hash
     */
    constructor(index: number, hash: string) {
        this.index = index;
        this.hash = hash;
    }

    /**
     * isValid - Check if the block is valid
     * @returns Returns true if the block is valid
     */
    isValid(): boolean {
        if(this.index < 0) return false;
        if(!this.hash) return false;
        return true;
    }
}