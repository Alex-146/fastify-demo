import { getItems, getItem, addItem, deleteItem, updateItem } from "../controllers/items.js"

const itemSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    value: { type: "string" }
  }
}

const getItemsOption = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          ok: { type: "boolean" },
          data: {
            type: "array",
            items: itemSchema
          }
        }
      }
    }
  },
  handler: getItems
}

const getItemOption = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "string" }
      }
    },
    response: {
      200: {
        type: "object",
        properties: {
          ok: { type: "boolean" },
          item: itemSchema
        }
      },
      400: {
        type: "object",
        properties: {
          ok: { type: "boolean" },
          message: { type: "string" }
        }
      }
    }
  },
  handler: getItem
}

const postItemOption = {
  schema: {
    body: {
      type: "object",
      required: ["value"],
      properties: {
        value: { type: "string" }
      }
    },
    response: {
      201: {
        type: "object",
        properties: {
          ok: { type: "boolean" },
          item: itemSchema
        }
      }
    }
  },
  handler: addItem
}

const deleteItemOption = {
  schema: {
    body: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" }
      }
    },
    response: {
      200: {
        type: "object",
        properties: {
          ok: { type: "boolean"},
          data: {
            type: "array",
            items: itemSchema
          }
        }
      }
    }
  },
  handler: deleteItem
}

const putItemOption = {
  schema: {
    body: {
      type: "object",
      required: ["id", "value"],
      properties: {
        id: { type: "string" },
        value: { type: "string" }
      }
    },
    response: {
      200: {
        type: "object",
        properties: {
          ok: { type: "boolean"},
          data: {
            type: "array",
            items: itemSchema
          }
        }
      }
    }
  },
  handler: updateItem
}

/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {*} options 
 * @param {*} done 
 */
function route(fastify, options, done) {

  fastify.get("/items", getItemsOption)
  
  fastify.get("/items/:id", getItemOption)

  fastify.post("/items", postItemOption)

  fastify.delete("/items", deleteItemOption)

  fastify.put("/items", putItemOption)

  done()
}

export default route