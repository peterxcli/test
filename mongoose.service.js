import mongoose from 'mongoose';
import config from './env.config.js';

const options = {
    // poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    // bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    autoIndex: true
};

// const connectWithRetry = () => {
//     console.log('MongoDB connection with retry')
//     // console.log(mongoose.connect("mongodb://127.0.0.1:27017/rest-tutorial", options))
//     mongoose.connect(config.mongo_url, options).then(() => {
//         console.log('MongoDB is connected')
//     }).catch(err => {
//         console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
//         setTimeout(connectWithRetry, 5000)
//     })
// };

// connectWithRetry();

mongoose.connect(config.mongo_url, options)
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', (err) => console.error('connection error', err)); // 連線異常
db.once('open', (db) => console.log('Connected to MongoDB')); // 連線成功

export default mongoose;
