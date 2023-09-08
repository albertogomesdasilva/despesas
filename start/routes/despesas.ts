import Route from '@ioc:Adonis/Core/Route'

Route.resource('/despesas', 'DespesasController').apiOnly() //Apenas para os métodos usados, excluímos create() e edit()
