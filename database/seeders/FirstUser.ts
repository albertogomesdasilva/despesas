import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import  User from 'App/Models/User'

export default class extends BaseSeeder {
//  public static developmentOnly = true  // Opcional para a seed só ser executada em modo de desenvolvimento

  public async run () {
    // Write your database queries inside the run method
    await User.create({
      email: 'albertogomesdasilva@gmail.com',
      password: '123456'
    })
  }
}
