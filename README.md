https://legacy.adonisjs.com/docs/4.1/migrations#_run_migrations




1. npm init adonis-ts-app@latest facebook-api
   npx create-adonis-ts-app backend

2. criar o banco de dados

3. npm install @adonisjs/lucid  -> Instala o pacote para acessar banco de dados

4. node ace configure @adonisjs/lucid -> Configura o tipo de banco de dados

5. Configura o arquivo env.ts com as variáveis de conexão para Mysql/MariaDB:
import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
	HOST: Env.schema.string({ format: 'host' }),
	PORT: Env.schema.number(),
	APP_KEY: Env.schema.string(),
	APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
	NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
	DB_CONNECTION: Env.schema.string(),
	MYSQL_HOST: Env.schema.string({ format: 'host'}),
	MYSQL_PORT: Env.schema.number(),
	MYSQL_USER: Env.schema.string(),
	MYSQL_PASSWORD: Env.schema.string.optional(),
	MYSQL_DB_NAME: Env.schema.string(),
})

6. npm install @adonisjs/auth -> Instalar o pacote de autenticação
7. node ace configure @adonisjs/auth  -> Configurar o pacote de autenticação

8. node ace make:validator Auth/StoreValidator  -> Criar o validator de autenticação

9.  node ace make:controller Auth -r -> Cria o arquivo App/Controller/Http/AuthController.ts renomeamos o nome do arquivo para Main.ts para ser um controlador principal e o nome da classe será AuthController. 
Apagaremos os métodos e só deixaremos o método store() para quando o usuário fizer o login e destroy() para quando o usuário fizer o logout.

10. Importar o arquivo App/Validators/Auth no Main.ts

11. Criar a pasta start/routes e mover o arquivo routes.ts para lá e renomear para index.ts

12. Importar o middleware auth em start/kernel (no finalzinho do arquivo)
 Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth')
})

13. arquivo .env -> Configurar  o banco de dados:
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=aoiqL8OvYHiqeb1_MI6hTJco1k7zpKt4
DRIVE_DISK=local
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=123456
MYSQL_DB_NAME=facebook-api

14. node ace migration:run -> Cria as tabelas de controle de usuários no banco de dados

15. node ace make:seeder FirstUser -> Criando seede para o primeiro usuario:
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.create({
      email: 'albertogomesdasilva@gmail.com',
      password:'123456'
    }) 

  }
}

16. npm install --save phc-argon2 -> Pacote para fazer o hash da senha

17. node ace db:seed -> Executar as seeders, Cria neste caso o primeiro usuário

18. Importar o arquivo de rotas de autenticação no index.ts
import './auth'

19. npm install @adonisjs/lucid    -> Instalar o ORM do Adonis no projeto
20. node ace invoke @adonisjs/lucid -> Configurar o pacote para a aplicação selecionando o tipo de banco de dados

.env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=4Xr_i_Xno48VuqA3huuxKDFnHi5IGxYB
DRIVE_DISK=local

DB_CONNECTION=mysql

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=123456
MYSQL_DB_NAME=adonis

env.ts
import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  DB_CONNECTION: Env.schema.string(),
  MYSQL_HOST: Env.schema.string({ format: 'host' }),
  MYSQL_PORT: Env.schema.number(),
  MYSQL_USER: Env.schema.string(),
  MYSQL_PASSWORD: Env.schema.string.optional(),
  MYSQL_DB_NAME: Env.schema.string(),
})

21. node ace make:migration posts -> Criar a migration de postagens em Database/migrations

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('descricao')
      table.decimal('valor',2)
      table.dateTime('vencimento')
      table.boolean('status')
      table.dateTime('pagamento')
      table.enu('level', ['basic', 'advanced'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

22. node ace migration:run -> Rodar as migrations e gerar as tabelas no banco de dados.
    node ace migration:rollback -> Desfaz a última criação das tabelas

    >node ace make:migration add_slug_collunm --table=posts -> adicionando uma migration para criar uma coluna na tabela posts

 Reverter migrações
Você pode reverter migrações executando o migration:rollbackcomando. A ação de reversão é executada nas migrações do lote mais recente. No entanto, você também pode especificar um número de lote personalizado até o qual deseja reverter.


# Rollback the latest batch
node ace migration:rollback

# Rollback until the start of the migration
node ace migration:rollback --batch=0

# Rollback until batch 1
node ace migration:rollback --batch=1

O migration:resetcomando é basicamente um apelido para migration:rollback --batch=0. Isso reverterá todas as migrações do seu aplicativo:


node ace migration:reset

 Reverter e migrar usando um único comando
O migration:refreshcomando reverterá todas as suas migrações e, em seguida, executará o migration:runcomando. Este comando recria efetivamente todo o seu banco de dados:


node ace migration:refresh

# Refresh the database and run all seeders
node ace migration:refresh --seed

 Eliminar tabelas e migrar
Ao contrário do migration:refreshcomando, o migration:freshcomando não executará o downmétodo dos arquivos de migração. Em vez disso, ele eliminará todas as tabelas usando o db:wipecomando e, em seguida, executará o migration:runcomando.


node ace migration:fresh

# Drop all tables, migrate, and run seeders
node ace migration:fresh --seed

# migration:freshe db:wipeos comandos eliminarão todas as tabelas do banco de dados. Este comando deve ser usado com cuidado ao desenvolver em um banco de dados compartilhado com outros aplicativos.

# Rodando a migration que cria uma nova coluna 'obs'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('obs').after('pagamento')  // AQUI INFORMO O A POSIÇÃO DA NOVA COLUNA
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropChecks('obs')
  })
}
}

>node ace migration:run

node ace make:controller Despesa -r


23. node ace make:model Post -> Criando a Model de Postagens em app\Models\Post.ts

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


### CONTROLER DE CRUD  - DespesasController.ts

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

# Rotas do CRUD
start/routes

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/posts', 'PostsController.index')

Route.resource('/despesas', 'DespesasController').apiOnly() //Apenas para os métodos usados, excluímos create() e edit()

λ node ace list:routes
GET|HEAD     /uploads/* ────────────────────────────────────────── drive.local.serve › Closure
GET|HEAD     / ─────────────────────────────────────────────────────────────────────── Closure
GET|HEAD     /posts ──────────────────────────────────────────────────── PostsController.index
GET|HEAD     /despesas ───────────────────────────── despesas.index › DespesasController.index
POST         /despesas ───────────────────────────── despesas.store › DespesasController.store
GET|HEAD     /despesas/:id ─────────────────────────── despesas.show › DespesasController.show
PUT|PATCH    /despesas/:id ─────────────────────── despesas.update › DespesasController.update
DELETE       /despesas/:id ───────────────────── despesas.destroy › DespesasController.destroy

 # Instalar pacote de autenticação:
  npm i @adonisjs/auth 
# Configurar o pacote de autenticação:
node ace invoke @adonisjs/auth

# RODAR AS MIGRATIONS DE AUTENTICAÇÃO
node ace migration:run
# Criar o Controller com a lógica de login e logout
node ace make:controller Auth -r

AuthController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password, {
      expiresIn: '30 days'
    })

    return token
  }


  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}

# Criando as rotas de login e logout
start/routes.ts

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/posts', 'PostsController.index')

Route.resource('/despesas', 'DespesasController').apiOnly() //Apenas para os métodos usados, excluímos create() e edit()

Route.post ('/auth', 'AuthController.store')

Route.post ('/auth', 'AuthController.destroy')

* Criamos dentro de start uma pasta de nome routes e dentro dela colocamos os arquivos de rotas auth.ts, posts.ts,
  depesas.ts e o index.ts para exportar todos os outros, uma maneira de organizar as rotas em arquivos separados.
*******************************
  index.ts
  import Route from '@ioc:Adonis/Core/Route'

import './auth'

import './despesas'

import './posts'


Route.get('/', async () => {
    return { hello: 'world' }
  })
 ***************************** 
auth.ts
import Route from '@ioc:Adonis/Core/Route'

Route.post ('/auth', 'AuthController.store')

Route.post ('/auth', 'AuthController.destroy')

*** ou podemos colocar em grupo:

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'AuthController.store')
  Route.delete('/', 'AuthController.destroy')
}).prefix('/auth')

***************************
 
posts.ts
import Route from '@ioc:Adonis/Core/Route'

Route.get('/posts', 'PostsController.index')

*******************************
despesas.ts
import Route from '@ioc:Adonis/Core/Route'

Route.resource('/despesas', 'DespesasController').apiOnly() //Apenas para os métodos usados, excluímos create() e edit()
************************************


# Criando um primeiro usuário com seed:
node ace make:seeder FirstUser
 database/seeders/FirstUser.ts
 import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import  User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.create({
      email: 'albertogomesdasilva@gmail.com',
      password: '123456'
    })
  }
}
# Executar a seed que cadastra o primeiro usuário:
node ace db:seed
* se precisar instala o pacote de hash: 

npm i phc-argon2

**********





17. node ace serve --watch -> Rodar o Servidor para testar









### https://github.com/cataline4learning

Descrição
Adobe XD para download
https://www.dropbox.com/s/lvj5u0aa1pr9n1d/Facebook_Front-end-Nuxt.xd?dl=0

Adobe XD online
https://xd.adobe.com/view/b24a0319-7e81-4c6f-a7e1-4aa1213ecade-e719/

Descrição
docker-compose.yml

version: '3.9'

services:
  database:
    image: mysql
    platform: linux/x86_64
    container_name: facebook
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 'secret'
      MYSQL_DATABASE: 'facebook'
    ports:
      - '3306:3306'
Não esquece de colocar as informações de conexão com banco de dados no arquivo .env como eu esqueci na aula haha





 <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

 npm install vue@next (Precisa cofigurar tudo do zero)

 npm install -g @vue/cli -> Instala uma aplicação completa
vue --version

vue create <nome-do-projeto>

 






<!DOCTYPE html>
<html lang="pt-br">
<head>
   <meta charset="UTF-8">
   <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
   <title>Vue JS</title>
</head>
    <body>
        <div id="app">
            <div class="container">
                <h1>Hello {{name }} </h1>
                <button class="btn btn-success" @click="message">Clique para alert</button><hr>
                <button class="btn btn-primary" @click="mudarName">Mudar o Nome</button><hr>
                <button class="btn btn-warning" @click="voltarName">Voltar o Nome</button>

            </div>
        </div>
            <script>
                
                var app = Vue.createApp({
                    data() {
                        return {
                        name: 'Cataline'
                        }
                    },
                    methods: {
                        message(){
                            alert( this.name )
                        },
                        mudarName(){
                            this.name = 'Alberto'
                        },
                        voltarName(){
                            location.reload()
                        }
                    }    
                }).mount('#app')

            </script>
            
    </body>
</html>

/*****************************************************************************/
<!DOCTYPE html>
<html lang="pt-br">
<head>
   <meta charset="UTF-8">
   <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
   <title>Vue JS</title>
</head>
    <body>
        <div id="app">
            <div class="container">
                <h1>Hello {{name }} </h1><hr>
                <button class="btn btn-success" @click="message">Clique para alert</button><hr>
                <button class="btn btn-primary" @click="mudarName">Mudar o Nome</button><hr>
                <button class="btn btn-warning" @click="voltarName">Voltar o Nome</button><hr>
                <ul class="nav"  v-for="user in users" @click="clicando(user.name, user.idade)">
                    <ul> {{user.id + ' - ' + user.name }} -  {{ user.idade}}</ul>
                </ul>

            </div>
        </div>
            <script>
                
                var app = Vue.createApp({
                    data() {
                        return {
                        name: 'Cataline',
                        users: [
                        {id: 1, name:'Alberto', idade: 52},
                        {id: 2, name: 'Wendell', idade: 58},
                        {id: 3, name: 'Thácylla', idade: 20},
                        {id: 4, name:'Tânia',idade: 42}
                        ]
                    }
                    },
                    methods: {
                        message(){
                            alert( this.name )
                        },
                        clicando(name, idade){
                            alert(`${name} tem ${idade} anos de idade`)
                        },
                        mudarName(){
                            this.name = 'Alberto'
                        },
                        voltarName(){
                            location.reload()
                        }
                    }    
                }).mount('#app')

            </script>
            
    </body>
</html>

/*****************************************************************************/
CRIANDO PROJETO VUE
 <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

 npm install vue@next (Precisa cofigurar tudo do zero)

 npm install -g @vue/cli -> Instala uma aplicação completa
vue --version

vue create <nome-do-projeto>

 

# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



/*****************************************************************************/





/*****************************************************************************/


### https://github.com/cataline4learning

Descrição
Adobe XD para download
https://www.dropbox.com/s/lvj5u0aa1pr9n1d/Facebook_Front-end-Nuxt.xd?dl=0

Adobe XD online
https://xd.adobe.com/view/b24a0319-7e81-4c6f-a7e1-4aa1213ecade-e719/

Descrição
docker-compose.yml

version: '3.9'

services:
  database:
    image: mysql
    platform: linux/x86_64
    container_name: facebook
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 'secret'
      MYSQL_DATABASE: 'facebook'
    ports:
      - '3306:3306'
Não esquece de colocar as informações de conexão com banco de dados no arquivo .env como eu esqueci na aula haha





 <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

 npm install vue@next (Precisa cofigurar tudo do zero)

 npm install -g @vue/cli -> Instala uma aplicação completa
vue --version

vue create <nome-do-projeto>

 






<!DOCTYPE html>
<html lang="pt-br">
<head>
   <meta charset="UTF-8">
   <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
   <title>Vue JS</title>
</head>
    <body>
        <div id="app">
            <div class="container">
                <h1>Hello {{name }} </h1>
                <button class="btn btn-success" @click="message">Clique para alert</button><hr>
                <button class="btn btn-primary" @click="mudarName">Mudar o Nome</button><hr>
                <button class="btn btn-warning" @click="voltarName">Voltar o Nome</button>

            </div>
        </div>
            <script>
                
                var app = Vue.createApp({
                    data() {
                        return {
                        name: 'Cataline'
                        }
                    },
                    methods: {
                        message(){
                            alert( this.name )
                        },
                        mudarName(){
                            this.name = 'Alberto'
                        },
                        voltarName(){
                            location.reload()
                        }
                    }    
                }).mount('#app')

            </script>
            
    </body>
</html>

/*****************************************************************************/
<!DOCTYPE html>
<html lang="pt-br">
<head>
   <meta charset="UTF-8">
   <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
   <title>Vue JS</title>
</head>
    <body>
        <div id="app">
            <div class="container">
                <h1>Hello {{name }} </h1><hr>
                <button class="btn btn-success" @click="message">Clique para alert</button><hr>
                <button class="btn btn-primary" @click="mudarName">Mudar o Nome</button><hr>
                <button class="btn btn-warning" @click="voltarName">Voltar o Nome</button><hr>
                <ul class="nav"  v-for="user in users" @click="clicando(user.name, user.idade)">
                    <ul> {{user.id + ' - ' + user.name }} -  {{ user.idade}}</ul>
                </ul>

            </div>
        </div>
            <script>
                
                var app = Vue.createApp({
                    data() {
                        return {
                        name: 'Cataline',
                        users: [
                        {id: 1, name:'Alberto', idade: 52},
                        {id: 2, name: 'Wendell', idade: 58},
                        {id: 3, name: 'Thácylla', idade: 20},
                        {id: 4, name:'Tânia',idade: 42}
                        ]
                    }
                    },
                    methods: {
                        message(){
                            alert( this.name )
                        },
                        clicando(name, idade){
                            alert(`${name} tem ${idade} anos de idade`)
                        },
                        mudarName(){
                            this.name = 'Alberto'
                        },
                        voltarName(){
                            location.reload()
                        }
                    }    
                }).mount('#app')

            </script>
            
    </body>
</html>

/*****************************************************************************/
CRIANDO PROJETO VUE
 <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

 npm install vue@next (Precisa cofigurar tudo do zero)

 npm install -g @vue/cli -> Instala uma aplicação completa
vue --version

vue create <nome-do-projeto>

 

# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



/*****************************************************************************/





/*****************************************************************************/