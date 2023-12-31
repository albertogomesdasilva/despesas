import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
    public descricao: string

  @column()
    public valor: number

  @column()
    public vencimento: string

  @column()
    public status: boolean
  
  @column()
    public pagamento: string
  
  @column()
    public obs: string
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
