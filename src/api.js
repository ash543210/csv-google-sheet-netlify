let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
const serverless = require("serverless-http");

let app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "1024000000mb" }));
const router = express.Router();

const run = () => {
  let values = [
    [
      // Cell values ...
    ],
    // Additional rows ...
  ];
  values = [["items", "values"]];
  const data = [];
  data.push({
    range: String,
    values: values,
  });
  // Additional ranges to update.

  const body = {
    data: data,
  };
  gapi.client.sheets.spreadsheets.values
    .batchUpdate({
      spreadsheetId: "1PzV0A_LnQjAJx52pA6nNpXThMnv7s8cTt8jcEnIqstM",
      resource: body,
    })
    .then((response) => {
      const result = response.result;
      console.log(`${result.totalUpdatedCells} cells updated.`);
      // if (callback) callback(response);
    });
};

router.post("/", (req, res) => {
  const { data, keys } = req.body;
  console.log(data[0]);
  res.send("yahoooo!");
  //   for (let i = 0; i < 10; i++) console.log(req.body.data[i]);
});
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);

// app.listen(3001, () => {
//   console.log("listening");
// });
