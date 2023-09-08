import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'despesas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('obs').after('pagamento')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('obs')
  })
}
}
