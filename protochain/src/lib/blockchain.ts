import Block from "./block";
import Validation from "./validation";

/**
 * BLockchain class
 */
export default class Blockchain {
  blocks: Block[];
  nextIndex: number = 0;

  /**
   * Constructor -  Create a new blockchain
   */
  constructor() {
    this.blocks = [new Block(this.nextIndex, "previous_hash", "Genesis block")];
    this.nextIndex++;
  }

  getLastBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  addBlock(block: Block): Validation {
    const lastBlock = this.getLastBlock();

    const validationResult = block.isValidBlock(lastBlock.hash, lastBlock.index);
    if (!validationResult.success) {
      return new Validation(false, "Invalid block");
    } 

    this.blocks.push(block);
    this.nextIndex++;
    
    return new Validation();
  }

  getBlock(hash: string): Block | undefined {
    const blockResult = this.blocks.find((block) => block.hash === hash);
    return blockResult || undefined;
  }

  isVallidBlockchain(): Validation {
    if (this.blocks.length === 0) return new Validation(false, "Blockchain is empty");

    // começar a verificar a partir dos blocos mais recentes, e o bloco genesis não tem anterior
    // então não precisamos verificar o bloco genesis, no caso o bloco 1
    for (let i = this.blocks.length - 1; i > 0; i--) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];
      const validationResult = currentBlock.isValidBlock(previousBlock.hash, previousBlock.index);

      if (!validationResult.success)
        return new Validation(false, `Invalid block: #${currentBlock.index} - ${validationResult.message}`);
    }

    return new Validation();
  }
}