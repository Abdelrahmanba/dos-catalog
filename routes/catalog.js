const express = require('express')
const router = express.Router()
const db = require('../db/db')

// get by id
router.get('/info/:id', function (req, res, next) {
  const id = req.params.id
  db.get('SELECT * FROM catalog WHERE rowid  = ?', [id], (err, row) => {
    if (err) {
      return res.send(err)
    }
    return row ? res.send(row) : res.send({ message: 'no rows found' })
  })
})

// get by topic
router.get('/search', function (req, res, next) {
  const query = req.query
  db.all(`SELECT * FROM catalog WHERE topic = ?`, [query.topic], (err, rows) => {
    if (err) {
      return res.send(err)
    }
    return rows ? res.send(rows) : res.status(400).send({ message: 'no rows found' })
  })
})

// update price and stock

router.put('/book/:id', function (req, res, next) {
  const query = req.query
  const id = req.params.id
  const params = []
  let sql =
    'UPDATE catalog SET ' +
    (query.price ? 'price = ? ' : '') +
    (query.price && query.stock ? ',' : '') +
    (query.stock ? 'stock = ? ' : '') +
    'WHERE rowid = ?'
  console.log(sql)
  db.get('SELECT * FROM catalog WHERE rowid  = ?', [id], (err, row) => {
    if (err) {
      return res.send(err)
    }
    row
    if (query.price) {
      params.push(query.price)
    }
    if (query.stock) {
      params.push(row.stock + parseInt(query.stock))
    }
    if (row.stock + parseInt(query.stock) < 0) {
      return res.status(400).send({ message: 'resource not found' })
    }
    params.push(id)
    row
      ? db.run(sql, params, (err, rows) => {
          if (err) {
            return res.status(400).send(err.message)
          }
          return res.send({ message: 'updated successfully' })
        })
      : res.send({ message: 'no rows found' })
  })
})

module.exports = router
