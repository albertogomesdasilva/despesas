import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Despesa from 'App/Models/Despesa'

import  User from 'App/Models/User'

export default class extends BaseSeeder {
//  public static developmentOnly = true  // Opcional para a seed só ser executada em modo de desenvolvimento

  public async run () {
    // Write your database queries inside the run method
    // await User.create({
    //   email: 'albertogomesdasilva@gmail.com',
    //   password: '123456',
    // }),

    await User.createMany([
      {
        email: 'albertogomesdasilva@gmail.com',
        password: '123456',
        role: 'normal'
      }, 
      {
        email: 'admin@admin.com',
        password: 'admin',
        role: 'admin'
      }
    ])
    
    Despesa.createMany([
      {
        descricao: 'Conta de Energia',
        valor: 278.88,
        vencimento: '2023-09-12',
        pagamento: '2023-09-5'
      }
    ])
  }
    
}
