import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretclinictoken', {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
export const register = async (req, res, next) => {
    try {
        const { username, phone, password, clinicId, role } = req.body;

        const userExists = await User.findOne({ phone });

        if (userExists) {
            return res.status(400).json({ success: false, message: 'ဤဖုန်းနံပါတ်ဖြင့် အကောင့်ရှိပြီးသားဖြစ်ပါသည်။' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            phone,
            password: hashedPassword,
            clinicId,
            role
        });

        if (user) {
            res.status(201).json({
                success: true,
                data: {
                    _id: user._id,
                    username: user.username,
                    phone: user.phone,
                    role: user.role,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.status(400).json({ success: false, message: 'အကောင့်ဖွင့်ခြင်း မအောင်မြင်ပါ။' });
        }
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ 
                success: false, 
                message: `ဤ ${field} အသုံးပြုပြီးသား ဖြစ်နေပါသည်။ (This ${field} is already in use.)` 
            });
        }
        next(error);
    }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
export const login = async (req, res, next) => {
    try {
        const { phone, password } = req.body;

        const user = await User.findOne({ phone });

        if (user && (await user.matchPassword(password))) {
            res.json({
                success: true,
                data: {
                    _id: user._id,
                    username: user.username,
                    phone: user.phone,
                    role: user.role,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'ဖုန်းနံပါတ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်။' });
        }
    } catch (error) {
        next(error);
    }
};
