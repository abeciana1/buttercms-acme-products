import Cors from 'cors'

const allowedOrigins = ['http://localhost:3000', 'https://drop-the-needle.vercel.app']

const cors = Cors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Content-Type', 'X-Api-Version']
});

export const runMiddleware = async (req, res) => {
    return new Promise((resolve, reject) => {
        cors(req, res, (result) => {
        if (result instanceof Error) {
            return reject(result);
        }
        return resolve(result);
        });
    });
}