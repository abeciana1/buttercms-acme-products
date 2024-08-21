const handler = (req, res) => {
    if (req.method === 'POST') {
        try {
            const payload = req.body
            console.log(payload)
            res.status(200)
        } catch (e) {
            console.error('error', e)
            res.status(500).json({ error: 'An error occurred' })
        }
    }
}

export default handler