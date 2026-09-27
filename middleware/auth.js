import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// အကောင့်ဝင်ထားခြင်း (Token) ပါ/မပါ စစ်ဆေးမယ့် Middleware
export const requireAuth = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({
                success: false,
                message: 'လုပ်ဆောင်ခွင့် မရှိပါ။ ကျေးဇူးပြု၍ အကောင့်ဝင်ပါ။ (Token Failed)'
            });
        }
    }

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'လုပ်ဆောင်ခွင့် မရှိပါ။ ကျေးဇူးပြု၍ အကောင့်ဝင်ပါ။ (No Token)'
        });
    }
};