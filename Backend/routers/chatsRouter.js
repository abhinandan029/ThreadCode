import express from  'express'

import {getChats} from '../controllers/chatsController.js'

const router = express.Router();

router.get('/api/chats', getChats);

export default router;