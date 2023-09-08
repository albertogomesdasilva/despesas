import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/posts', 'PostsController.index')

Route.resource('/despesas', 'DespesasController').apiOnly() //Apenas para os métodos usados, excluímos create() e edit()