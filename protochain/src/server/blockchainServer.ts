import express from "express";
import morgan from "morgan";
import Blockchain from "../lib/blockchain";

const PORT: number = 3000;
const app = express();

app.use(morgan("tiny"));
app.use(express.json());

// Initialize a new blockchain instance with the criation of genesis block
const blockchain = new Blockchain();

app.get("/", (req, res) => {
  const blcoks = blockchain.blocks;
  res.json(blcoks);
});

app.get("/status", (req, res) => {
  res.send({
    numberOfBlocks: blockchain.blocks.length,
    isValid: blockchain.isVallidBlockchain(),
    lastBlock: blockchain.getLastBlock(),
    nextIndex: blockchain.nextIndex
  });
});

app.get("/blocks/:indexOrHash", (req, res) => {
  let block;
  if(/^[0-9]+$/.test(req.params.indexOrHash)) { // verifica se é um ID ou um HASH
    const index = parseInt(req.params.indexOrHash);
    block = blockchain.blocks[index];
  }
  else {
    block = blockchain.getBlock(req.params.indexOrHash);
  }

  if(!block) {
    return res.status(404).send({ error: "Block not found" });
  }

  res.json(block);
});

app.listen(PORT, () => {
  console.log(`Blockchain server is running on http://localhost:${PORT}`);
});