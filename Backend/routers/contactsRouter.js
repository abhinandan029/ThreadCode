import express from  'express'

import {getContacts, addContact} from '../controllers/contactsController.js'

const router = express.Router();

router.get('/api/home/contacts', getContacts);

router.post('/api/add-contact', addContact);

export default router;