# API DE DENUNCIAS

projeto: 
    O projeto em questão é uma api de denuncias.

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
A reposta
```
{
  "id": 01,
  "latitude": -9.5667657,
  "longitude": -35.7232721,
  "denunciator": {
    "name": "Teste de denuncia",
    "cpf": "11548242011"
  },
  "denounces": {
    "title": "Burraco no meio da rua",
    "description": "Existe um burraco no meio da rua que está dificultando a passagem dos veiculos, aonde já ocorreram 2 acidentes somente no dia de hoje"
  },
  "address": {
    "city": "Maceió",
    "country": "BR",
    "neightborhood": "",
    "postal_code": "57046295",
    "state": "Alagoas",
    "street": "Quadra AI"
  }
}
```
Passos para rodar o projeto

1. Cerifique-se de que você possui o Docker instalado na sua maquina, caso queira mais informações de como instalar o docker, rodar containers e entender a sua arquitetura entre no site oficial https://docs.docker.com/compose/gettingstarted/;
2. Certifique-se que tem o node instalado na maquina, assim como o npm que é um pacote para gerenciar dependencias. Para verificar a sua versão digite `node -v` para verificar sua versão do npm installado digite `npm -v`, você pode usar o `yarn` também, caso seja da sua vontade porém está documentação irá se focar no gerenciamento com `npm`;  

### Algumas considerações sobre a aplicação

O proje atualmente possui algumas dependencias importantes, sendo 1 delas necessário a criação de conta (Gratuita). Algumas das técnologias utilizadas são:

- Nodejs -v 15.2.1
- Npm -v 7.0.8
- Typescript
- Docker
- Postgres
- Redis
- Papertrail - solar wings
- Jest
- Typeorm

Pensando na escalabilidade, também existem alguns packages(dependencias) que foram instaladas para melhorar a performance previnir attacks e etc, mas não irei me aprofundar nelas por enquanto.

### Dependencias que precisam de conta para acesso
Dentre os serviços utilizados apenas o <b>papertrail</b> necessita de uma conta mas não é nenhum bixo de 7 cabeças, deixarei um link para mais informações sobre o serviço e como voce poderá fazer uma conta, caso não tenha:

    1. Papertrail
     
https://www.papertrail.com/

Após criar a conta(ou se caso ja tenha alguma) é preciso que voce sete no arquivo .env a url e a porta do serviço lá na aba `LOGS`.

ps: deixarei uma conta já no .env.example para voce, caso deseje pular essa etapa.

## Agora sim com tudo instalado vamos brincar!

1. Entre na pasta raiz do projeto
2. Abra o seu terminal e digite o comando `npm i` e aguarde a instalação das dependências.
3. Na pasta raiz do projeto digite `cp .env.example .env` para ativar o nosso .env, aonde nossas configurações de banco, cache, urls, keys e etc estão atreladas, é lá aonde você deverá colocar as suas configurações do banco e etc. Após preencher o .env siga para o passo 4.
4. Ainda na pasta raiz do projeto e com o terminal aberto digite o comando `docker-compose up -d`

Após esse comando aguarde a instalação dos container do docker.

A api possui 3 containers, sendo 
- 1- banco de dados ( estamos utilizando o postgresql, um banco escalavel noSQL com uma excelente performance).
- 2- Cache Redis para cachear o nosso retorno da api de geolocalização, criando assim um intermediário mais rápido para responder as requisições da api de Geo localização para saber mais sobre a api vá até: https://developer.mapquest.com/documentation/ .
- 3- O próprio servidor node aonde nossa aplicação é gerenciada.

Com tudo pronto rode os testes digite o comando a seguir para rodar os testes, nesse caso estamos utilizando o jest:
```
npm run test
```
O teste deve rodar sem falhas! Com tudo configurado e instalado corretamente rode o projeto com:
```
npm run dev
```
Após isso você já poderá fazer requisições para a URL: http://localhost:5000/v1/denuncias. 
A api só aceita requisições `POST` então recomendo que você tenha algum software para testar a api. Eu utilizo e recomendo o INSOMNIA: https://insomnia.rest/download/

Caso haja algum erro de requisição a propria api lhe informara qual o erro ex:
```
{
  "code": 0,
  "message": "Requisição invalida, latitude não encontrado."
}
```
ou 
```
{
  "errors": [
    {
      "code": "Cpf inválido",
      "message": "Cpf deve ter 11 digitos e não deve possuir barras pontos ou qualquer caracter especial."
    }
  ]
}
```
Caso a api de Geolocalização não encontre determinado enredeço através da longitude e latitude passada então você verá a seguinte mensagem:
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