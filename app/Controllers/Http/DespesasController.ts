import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Despesa from 'App/Models/Despesa'

// import Database from '@ioc:Adonis/Lucid/Database'

export default class DespesasController {
  public async index({}: HttpContextContract) {
    const despesas = await Despesa.all()

    return despesas
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    // const { descricao, valor, pagamento, status, vencimento, obs } = request.all()  // Se importar o Database na linha 3
    // const despesa = await Despesa.create({ descricao, valor, pagamento, status, vencimento, obs })  // Se importar o Database na linha 3
    const data = request.only([ 'descricao', 'valor', 'pagamento', 'status', 'vencimento', 'obs'  ])
    const despesa = await Despesa.create( data )

   
    return despesa
  }

  public async show({ params }: HttpContextContract) {
    // const despesa = Database.rawQuery(`select * from despesas where id = ${params.id} `)
    // PODERIA USAR ASSIM ******
    // const despesa = await Despesa.find(params.id)
    // if( !despesa) {
    //   return response.notFound({ error: {message: 'Not found!'} })
    // }  *******

    const despesa = await Despesa.findOrFail(params.id)   // ASSIM É MAIS SIMPLES

    return despesa
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ request, params}: HttpContextContract) {
    const despesa = await Despesa.findOrFail(params.id)
    const data = request.only([ 'descricao', 'valor', 'pagamento', 'status', 'vencimento', 'obs'  ])

    despesa.merge(data)

    await despesa.save()

  }

  public async destroy({ params }: HttpContextContract) {
    const despesa = await Despesa.findOrFail(params.id)

    await despesa.delete()
  }
}
