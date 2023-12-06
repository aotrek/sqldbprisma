const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.send({ message: "OK" });
  } catch (err) {
    res.send({ message: err.message });
  }
});

app.get("/user", async (req, res) => {
  try {
    const allUser = await prisma.user.findMany({
      take: 10,
      include: {
        posts: {
          include: {
            comments: true,
          },
        },
      },
    });
    res.send({ result: allUser });
  } catch (err) {
    res.send({ message: err.message });
  }
});

app.post("/user", async (req, res) => {
  try {
    const body = req.body;
    const addUser = await prisma.user.create({ data: body });
    addUser && res.send({ message: "User Save Successfully" });
  } catch (err) {
    res.send({ message: err.message });
  }
});

app.get("/post", async (req, res) => {
  try {
      const allUser = await prisma.post.findMany({
          include: {
              comments: {
                  include: {
                      users:true
                  }
              },
              users: true,
              _count:true,
          }
      });
    res.send({ result: allUser });
  } catch (err) {
    res.send({ message: err.message });
  }
});

app.post("/post", async (req, res) => {
  try {
    const body = req.body;
    const addUser = await prisma.post.create({ data: body });
    addUser && res.send({ message: "Post Save Successfully" });
  } catch (err) {
    res.send({ message: err.message });
  }
});

app.get("/comment", async (req, res) => {
  try {
    const allUser = await prisma.comment.findMany();
    res.send({ result: allUser });
  } catch (err) {
    res.send({ message: err.message });
  }
});

app.post("/comment", async (req, res) => {
  try {
    const body = req.body;
    const addUser = await prisma.comment.create({ data: body });
    addUser && res.send({ message: "Post Save Successfully" });
  } catch (err) {
    res.send({ message: err.message });
  }
});
app.get("/like", async (req, res) => {
  try {
    const allUser = await prisma.like.findMany();
    res.send({ result: allUser });
  } catch (err) {
    res.send({ message: err.message });
  }
});

app.post("/like", async (req, res) => {
  try {
    const body = req.body;
    const newLike = await prisma.like.create({
      data: {
        userId: 1,
        reaction: "Love",
      },
    });
    res.send({ message: "Post Save Successfully", data: newLike });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server side running port is ${PORT}`);
});
