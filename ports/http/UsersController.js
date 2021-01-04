const pick = require('lodash/fp/pick')

const UsersController = (container) => ({
  listUsers: async (req, res, next) => {
    const { ListUsers } = container

    const users = await ListUsers()
    res.send(users)
  },

  createUser: async (req, res, next) => {
    const { CreateUser } = container
    const { name, cpf, birthdate, subscription, dependents } = req.body

    const user = await CreateUser(
      name,
      cpf,
      birthdate,
      subscription,
      dependents
    )

    res.send(201, user)
  },

  findUser: async (req, res, next) => {
    const { GetUser } = container

    const user = await GetUser(req.params.id)
    res.send(user)
  },

  deleteUser: async (req, res, next) => {
    const { DeleteUser } = container

    await DeleteUser(req.params.id)
    res.send(204, {})
  },

  updateUser: async (req, res, next) => {
    const { UpdateUser } = container

    const permitted = [
      'name',
      'cpf',
      'birthdate',
      'subscription',
      'dependents'
    ]

    const user = await UpdateUser(req.params.id, pick(permitted, req.body))
    res.send(user)
  }
})

module.exports = UsersController
