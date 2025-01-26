import connectMongoDB from "./db/connectToMongoDB";
import createApp from "./createApp";

const PORT = process.env.PORT || 5000;
const app = createApp();


// app.get('/', (request, respond) => {
//   respond.status(200).send(Template())
// });

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  connectMongoDB();
  console.log(`server is running on http://localhost:${PORT}`);
});
