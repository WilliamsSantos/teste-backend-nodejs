# API DE DENÚNCIAS

projeto:
    O projeto em questão é uma api de denúncias.

segue ex de requisição:
```
curl -X POST \
    http://localhost:3000/v1/denuncias \
    -H 'Content-Type: application/json' \
    -d '{
        "latitude": -9.5667657,
        "longitude": -35.7232721,
        "denunciante": {
            "nome": "Teste de denuncia",
            "cpf": "11548242011"
        },
        "denuncia": {
            "titulo": "Burraco no meio da rua",
            "descricao": "Existe um burraco no meio da rua que está dificultando a passagem dos veiculos, aonde já ocorreram 2 acidentes somente no dia de hoje"
        }
    }
}'
```
A reposta:
```
{
  "id": 31,
  "latitude": -9.5667657,
  "longitude": -35.7232721,
  "denunciante": {
    "nome": "Teste de denuncia",
    "cpf": "11548242011"
  },
  "denuncia": {
    "titulo": "Burraco no meio da rua",
    "descricao": "Existe um burraco no meio da rua que está dificultando a passagem dos veiculos, aonde já ocorreram 2 acidentes somente no dia de hoje"
  },
  "endereco": {
    "logradouro": "Quadra AI",
    "bairro": "",
    "cidade": "Maceió",
    "estado": "Alagoas",
    "pais": "BR",
    "codigo_postal": "57046295"
  }
}
```
### Passos para rodar o projeto

1. Certifique-se de que você possui o Docker instalado na sua máquina, caso queira mais informações de como instalar o docker, rodar containers e entender a sua arquitetura entre no site oficial https://docs.docker.com/compose/gettingstarted/;
2. Certifique-se que tem o node instalado na máquina, assim como o `npm` que é um pacote para gerenciar dependências. Para verificar a sua versão digite `node -v` para verificar sua versão do npm instalado digite `npm -v`, você pode usar o `yarn` também, caso seja da sua preferência porém esta documentação irá se focar no gerenciamento das dependências usando o `npm`;  

### Algumas considerações sobre a aplicação

O projeto atualmente possui algumas dependências importantes. Algumas das tecnologias utilizadas são:

- Nodejs -v 15.2.1
- Npm -v 7.0.8
- Typescript
- Docker
- Postgres
- Redis
- Papertrail - solar wings
- Jest
- Typeorm

Pensando na escalabilidade, também existem alguns packages(dependências) que foram instaladas para melhorar a performance prevenir ataques e etc, grande parte das configurações do sistema podem ser alteradas no arquivo `Configurations.ts`.

### Dependências que precisam de conta para acesso
Dentre os serviços utilizados apenas o <b>papertrail</b> necessita de uma conta mas não é nenhum bixo de 7 cabeças, deixarei um link para mais informações sobre o serviço e como você poderá fazer uma conta, caso não tenha:

  1. Papertrail https://www.papertrail.com/

  2. api de geolocação  https://developer.mapquest.com/documentation/geocoding-api/;

Após criar a conta(ou se caso já tenha alguma) é preciso que você sete no arquivo `.env` a url e a porta do serviço lá na em `LOGS`.

ps: deixarei uma conta já no `.env.example` para você, caso deseje pular essa etapa.

## Agora sim com tudo instalado vamos brincar!

1. Entre na pasta raiz do projeto.
2. Abra o seu terminal e digite o comando `npm i` e aguarde a instalação das dependências.
3. Na pasta raiz do projeto digite `cp .env.example .env` para ativar o nosso `.env`, onde nossas configurações de banco, cache, urls, keys e etc estão atreladas, é lá aonde você deverá colocar as suas configurações do banco e etc. Após preencher o `.env` siga para o passo 4.
4. Ainda na pasta raiz do projeto e com o terminal aberto digite o comando `docker-compose up -d`
 
Após esse comando aguarde a instalação dos container do docker.

A api possui 3 containers, sendo
 - 1 - banco de dados ( estamos utilizando o postgresql, um banco escalável no SQL com uma excelente performance).
 - 2 - Cache Redis para cachear o nosso retorno da api de geolocalização, criando assim um intermediário mais rápido para responder às requisições da api de Geolocalização para saber mais sobre a api vá até: https://developer.mapquest.com/documentation/ .
 - 3 - O próprio servidor onde nossa aplicação é gerenciada.

Com tudo pronto rode os testes digitando o comando a seguir, nesse caso estamos utilizando o jest com um banco de testes sqlite3 rodando em memória:
```
npm run test
```
O teste deve rodar sem falhas! Com tudo configurado e instalado corretamente, você já poderá fazer as requisições para a URL: http://localhost:3000/v1/denuncias. 
A api só aceita requisições `POST` então recomendo que você tenha algum software para testar a api eu utilizo e recomendo o INSOMNIA: https://insomnia.rest/download/

Caso haja algum erro de requisição a própria api lhe informará qual o erro ex:
```
{
  "code": 0,
  "message": "Requisição inválida, latitude não encontrado."
}
```
ou 
```
{
  "errors": [
    {
      "code": "cpf",
      "message": "cpf deve conter apenas digitos."
    },
    {
      "code": "cpf",
      "message": "cpf deve ter no máximo 11 digitos."
    }
  ]
}
```
Caso a api de Geolocalização não encontre determinado endereço através da longitude e latitude passada, então, você verá a seguinte mensagem:
```
{
  "errors": [
    {
      "code": 0,
      "message": "Endereço não encontrado para essa localidade."
    }
  ]
}
```
Qualquer dúvida ou dificuldade para rodar o projeto entre em contato comigo pelo email: contato.williams.santos@gmail.com