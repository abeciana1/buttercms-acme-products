import { serialize } from 'cookie';
import { runMiddleware } from '../../../middleware/corsMiddleware'
import { generateAlphanumericId } from '@/lib/helper-functions'
import { zhCN } from 'date-fns/locale';

const handler = async (req, res) => {
    await runMiddleware(req, res)
    if (req.method === 'GET') {
        const sessionId = generateAlphanumericId()
        const cookie = serialize('ACMEcart', JSON.stringify({ sessionId }), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            path: '/',
        });

        res.setHeader('Set-Cookie', cookie);
        res.status(200).json({ success: true, sessionId });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }

}

export default handler