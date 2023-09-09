import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Despesa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descricao: string

@column()
  public valor: number

// ////////////////////////////////////////

@column()
  public vencimento: DateTime


/// //////////////////////////////////////////  
@column()
  public status: boolean

// /////////////////////////////////////////////  
@column()
  public pagamento: DateTime
///////////////////////////////////////  

@column()
  public obs: string
// ///////////////////////////////////////////

@column.dateTime({ 
    autoCreate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yyyy HH:mm:ss')
    }
  })
  public createdAt: DateTime

// /////////////////////////////

@column.dateTime({ 
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yyy HH:mm:ss')
    }
  })
  public updatedAt: DateTime
}
