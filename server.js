const dotenv = require('dotenv');
const app = require('./src/interfaces/http/app');
const connectDB = require('./src/infrastructure/database/mongoose');
const startMessaging = require('./src/infrastructure/messaging/startup');

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
    await connectDB();

    await startMessaging();

    app.listen(PORT, () => {
        console.log(`User Activity Log service listening on port ${PORT}`);
    });
};

start().catch(err => {
    console.error('Failed to start the application:', err);
});
