import express from 'express';
import { createUser, getClinicUsers } from '../controllers/user.controller.js';

const router = express.Router();


router.route('/')
    .post(createUser);


router.route('/clinic/:clinicId')
    .get(getClinicUsers);

export default router;