const Server = require('./server');

const app = Server.init(process.env.PORT);

app.start(() => console.log(`Server running at ${process.env.PORT}`));