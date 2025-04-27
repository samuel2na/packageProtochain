import Block from "../src/lib/block";
import Blockchain from "../src/lib/blockchain";

describe("blockchain tests", () => {

  test("should has genesis block", () => {
    const blockchain = new Blockchain();
    const valid = blockchain.blocks.length;
    expect(valid).toEqual(1);
  });

  test("should be valid (genesis)", () => {
    const blockchain = new Blockchain();
    expect(blockchain.isVallidBlockchain().success).toEqual(true);
  });

  test("should NOT be valid", () => {
    const blockchain = new Blockchain();
    const block = new Block(1, blockchain.blocks[0].hash, "Block 2");
    blockchain.addBlock(block);
    // vamos modificar o bloco criado para ver se a blockchain aceita ou recusa o bloco
    blockchain.blocks[1].data = "A trabsfere 2 para B";
    // primeiro foi adicionado um bloco, para então validar o blockchain com pelo menos 2 blocos nela
    expect(blockchain.isVallidBlockchain().success).toEqual(false);
  });

  test("should be valid (two blocks)", () => {
    const blockchain = new Blockchain();
    const block = new Block(1, blockchain.blocks[0].hash, "Block 2");
    blockchain.addBlock(block);
    // primeiro foi adicionado um bloco, para então validar o blockchain com pelo menos 2 blocos nela
    expect(blockchain.isVallidBlockchain().success).toEqual(true);
  });

  test("should add block", () => {
    const blockchain = new Blockchain();
    const block = new Block(1, blockchain.blocks[0].hash, "Block 2");
    const result = blockchain.addBlock(block);
    expect(result.success).toEqual(true);
  });

  test("should get block", () => {
    const blockchain = new Blockchain();
    const block = blockchain.getBlock(blockchain.blocks[0].hash);
    expect(block).toBeTruthy(); // se retornar um block então é true
  });

  test("should NOT add block", () => {
    const blockchain = new Blockchain();
    // vamos simular e criar um bloco quebrado de propósito, com indice inválido
    const block = new Block(-1, blockchain.blocks[0].hash, "Block 2");
    const result = blockchain.addBlock(block);
    //return false pois a função impede a adição do bloco
    expect(result.success).toEqual(false); 
  });

});