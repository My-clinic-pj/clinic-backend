const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') {
        const message = `ရှာဖွေနေသော ID မှားယွင်းနေပါသည်။`;
        error = new Error(message);
        error.statusCode = 404;
    }

    if (err.code === 11000) {
        const message = 'ဒီအချက်အလက်က Database ထဲမှာ ရှိပြီးသား ဖြစ်နေပါတယ်။ (ထပ်နေပါသည်)';
        error = new Error(message);
        error.statusCode = 400;
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new Error(message);
        error.statusCode = 400;
    }

    if (err.message === 'Unauthenticated') {
        const message = 'လုပ်ဆောင်ခွင့် မရှိပါ။ ကျေးဇူးပြု၍ အကောင့်ဝင်ပါ။ (Unauthorized)';
        error = new Error(message);
        error.statusCode = 401;
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server တွင် ချို့ယွင်းချက် ရှိနေပါသည်။'
    });
};

export default errorHandler;