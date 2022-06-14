const express = require("express");
const app = express();
var bodyParser = require("body-parser");

var cors = require("cors");
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.get("/", (req, res) => res.send("API Running"));
var users = [
  {
    email: "k180154@nu.edu.pk",
    password: "QWERTY",
    CustomerID: "001",
    name: "Usama",
    waletPublicKey: "0x2687F4d32C7E9f1220CC0849DbD1F684a6D2ED15",
  },
  {
    email: "k180171@nu.edu.pk",
    password: "QWERTY",
    CustomerID: "002",
    name: "Affan",
    waletPublicKey: "0x2149d21a620e7afCB5f0Ca13bdcCf598C6404373",
  },
  {
    email: "k180292@nu.edu.pk",
    password: "QWERTY",
    CustomerID: "003",
    name: "Anand",
    waletPublicKey: "0x057644afb7C68affD4bb2995B0d942edd9321F88",
  },
];
app.get("/get-users", (req, res) => {
  return res.json(users);
});

app.post("/auth", (req, res) => {
  authenticated = false;
  users.forEach((e) => {
    if (e.email == req.body.email && e.password == req.body.password) {
      authenticated = true;
    }
  });

  return res.json({ authenticated: authenticated });
});

app.get("/get-registered-nfts", (req, res) => {
  var nfts = [
    {
      Nft: "NFT1",
      NftId: "001",
      NftJsonUri:
        "https://gateway.pinata.cloud/ipfs/QmTwN5sP3pBcJLn572Kvxjk386khTpxfP8MYWH3iwhKu98",
      NFTImage:
        "https://gateway.pinata.cloud/ipfs/QmVQHo1s35RrzH2xFoXALqLEAZqK2hXxW79MQEvHtb3LnU",
      price: 8,
    },
    {
      Nft: "NFT2",
      NftId: "002",
      NftJsonUri:
        "https://gateway.pinata.cloud/ipfs/QmSVF8GXmwYrkyhCNwyQiPKHApqy7TDSk5PXjBujHs2Fis",
      NFTImage:
        "https://gateway.pinata.cloud/ipfs/QmYdFnTSJScm7zeMGwkdoBKuAxyaDFJMYTMazomvUfJmJR",
      price: 13,
    },
    {
      Nft: "NFT3",
      NftId: "003",
      NftJsonUri:
        "https://gateway.pinata.cloud/ipfs/QmXvMCeV4w3vr1ABzp9uaxjDpNQBpStmBG2PShrGKfdJbn",
      NFTImage:
        "https://gateway.pinata.cloud/ipfs/QmVgFWo6yDat2ATt3TgGiT3ioVcw79c7u14Nw1equxedB9",
      price: 10,
    },
  ];

  return res.json(nfts);
});

app.get("/get-walmart-products", (req, res) => {
  var Walmart = [
    {
      storeId: "01",
      storeType: "Mens Clothing",
      storeName: "Outfitter",
      products: [
        {
          productId: "001",
          productName: "Dress Shirt",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJRyknZcmYk949gRH1CkcdlliJOqTrFTct0Q&usqp=CAU",
          price: 5,
        },
        {
          productId: "002",
          productName: "Dress Pent",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStSlqHSC6-97jn5kqBfAO2kaGsorj4lzdFRQ&usqp=CAU",
          price: 8,
        },
        {
          productId: "003",
          productName: "Cowboy Hat",
          image:
            "https://i.etsystatic.com/15881772/r/il/1a572d/2212077090/il_570xN.2212077090_mpts.jpg",
          price: 4,
        },
      ],
    },
    {
      storeId: "02",
      storeType: "Womans Clothing",
      storeName: "Bonanza Satrangi",
      products: [
        {
          productId: "001",
          productName: "Shirt",
          image: "https://dressing.pk/390/bonanza-satrangi-haw-blanche.jpg",
          price: 5,
        },
        {
          productId: "002",
          productName: "frock",
          image:
            "https://stylesatlife.com/wp-content/uploads/2018/04/Skater-Frock.jpg",
          price: 8,
        },
        {
          productId: "003",
          productName: "girls hats",
          image:
            "https://www.hutstuebele.com/pic/STERNTALER-girls-fabric-hat.47715_f25.jpg",
          price: 4,
        },
      ],
    },
  ];

  return res.json(Walmart);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
