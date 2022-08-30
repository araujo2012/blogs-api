const verifyName = (req, res, next) => {
    const { name } = req.body;
    if ((name === undefined) || (name.length === 0)) {
        return res.status(400).json({ message: '"name" is required' });
    }
    next();
};

module.exports = {
    verifyName,
};