import Fastify from "fastify"
const fastify = Fastify({ logger: true })

fastify.register(import("fastify-swagger"), { 
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: { title: "application-api" }
  }
})

fastify.register(import("./routes/items.js"))

const PORT = process.env.PORT ?? 5500

fastify.get("/", (req, reply) => {
  reply.send({
    PORT,
    date: new Date().toISOString(),
    env: process.env.NODE_ENV ?? "dev"
  })
})

fastify.listen(PORT, () => console.log(`Server started at ${PORT}...`))