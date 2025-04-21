import Blockchain from "../src/lib/blockchain";

describe("blockchain tests", () => {

  test("should has genesis block", () => {
    const blockchain = new Blockchain();
    const valid = blockchain.blocks.length;
    expect(valid).toEqual(1);
  });

});