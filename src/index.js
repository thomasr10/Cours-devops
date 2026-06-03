const app = require("express")();

app.get("/", (req, res) => res.json({ message: "Bonjouuuur :)" }));

const port = process.env.PORT || 6000;

app.listen(port, () =>
  console.log(`app listening on http://localhost:${port}`)
);