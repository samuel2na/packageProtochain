import Block from "./block";

/**
 * BLockchain class
 */
export default class Blockchain {
  blocks: Block[];

  /**
   * Constructor -  Create a new blockchain
   */
  constructor() {
    this.blocks = [new Block(0, "Genesis")];
  }

  /*addBlock(block: Block): void {
    if (block.isValid()) {
      this.blocks.push(block);
    } else {
      throw new Error("Invalid block");
    }
  }*/
 
}