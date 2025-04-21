import Block from '../src/lib/block';

describe('block tests', () => {

  test('should be valid', () => {
    let index = 1;
    let hash = "abc";
    const block = new Block(index, hash);
    const valid = block.isValid();
    expect(valid).toBeTruthy();
  });

  test('should NOT be valid (hash)', () => {
    let index = 1;
    let hash = "";
    const block = new Block(index, hash);
    const valid = block.isValid();
    expect(valid).toBeFalsy();
  });

  test("should NOT be valid (index)", () => {
    let index = -1;
    let hash = "abc";
    const block = new Block(index, hash);
    const valid = block.isValid();
    expect(valid).toBeFalsy();
  });
});