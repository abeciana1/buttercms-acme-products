const handler = (req, res) => {
    if (req.method === 'POST') {
        try {
            const payload = req.body
            res.status(200).json({ message: 'Webhook received successfully', payload });

        } catch (e) {
            console.error('error', e)
            res.status(500).json({ error: 'An error occurred' })
        }
    }
}

export default handler