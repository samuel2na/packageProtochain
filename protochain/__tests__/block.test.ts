import Block from '../src/lib/block';

describe('block tests', () => {

  // criando o bloco genesis para poder passar como parametro nos lugares que precisa da informação de um
  // bloco anterior, já que o bloco genesis não tem um bloco anterior
  let genesis: Block;
  beforeAll(() => {
    genesis = new Block(0, "", "Genesis block");
  });

  test('should be valid', () => {
    let index = 1;
    let previousHash = genesis.hash;
    let data = "abc";

    const block = new Block(index, previousHash, data);
    const valid = block.isValidBlock(genesis.hash, genesis.index);
    expect(valid.success).toBeTruthy();
  });

  test("should NOT be empty or null (previous hash)", () => {
    let index = 1;
    let previousHash = "";
    let data = "abc";

    const block = new Block(index, previousHash, data);
    const valid = block.isValidBlock(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });

  test("should NOT be empty or null (data)", () => {
    let index = 1;
    let previousHash = genesis.hash;
    let data = "";

    const block = new Block(index, previousHash, data);
    const valid = block.isValidBlock(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });

  test("should NOT be less than zero (index)", () => {
    let index = -1;
    let previousHash = genesis.hash;
    let data = "abc";

    const block = new Block(index, previousHash, data);
    const valid = block.isValidBlock(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });

  test("should NOT be less than zero (timestamp)", () => {
    let index = 1;
    let previousHash = genesis.hash;
    let data = "abc";
    
    const block = new Block(index, previousHash, data);
    block.timestamp = -1;
    block.hash = block.getHash(); // mudou o timestamp, então precisa recalcular o hash

    const valid = block.isValidBlock(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });

});