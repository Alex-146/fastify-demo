import { items } from "../db/items.js"

function getItems(req, reply) {
  reply.send({
    ok: true,
    data: items
  })
}

function getItem(req, reply) {
  const { id } = req.params
  const item = items.find(item => item.id === id)
  if (item) {
    reply.send({
      ok: true,
      item
    })
  }
  else {
    reply.code(400).send({
      ok: false,
      message: "Item doesn't exists!"
    })
  }
}

function addItem(req, reply) {
  const { value } = req.body
  reply.code(201).send({
    ok: true,
    item: {
      id: Date.now().toString(),
      value
    }
  })
}

function deleteItem(req, reply) {
  const { id } = req.body
  const item = items.find(item => item.id === id)
  
  if (item) {
    reply.send({
      ok: true,
      data: items.filter(i => i.id !== item.id)
    })
  }
  else {
    reply.code(400).send({
      ok: false,
      message: "Item doesn't exists!"
    })
  }
}

function updateItem(req, reply) {
  const { id, value } = req.body
  const item = items.find(item => item.id === id)
  if (item) {
    reply.send({
      ok: true,
      data: [...items.filter(i => i.id !== item.id), { id, value }]
    })
  }
  else {
    reply.code(400).send({
      ok: false,
      message: "Item doesn't exists!"
    })
  }
}

export { getItems, getItem, addItem, deleteItem, updateItem }