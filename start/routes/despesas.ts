import Route from '@ioc:Adonis/Core/Route'


//Apenas para os métodos usados, excluímos create() e edit()
Route.resource('/despesas', 'DespesasController').apiOnly().middleware({ store: 'auth', update: 'auth', destroy: 'auth'})