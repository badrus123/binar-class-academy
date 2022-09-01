const express = require('express')
const router = express.Router()
const sekolah = require('../controller/sekolah')

router.post('/sekolah', sekolah.create)
router.post('/siswa', sekolah.createSiswa)

router.get('/siswa', sekolah.getSiswa)

module.exports = router
