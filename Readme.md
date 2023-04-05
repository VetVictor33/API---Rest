# Praticando API Rest

Exercício proposto durante as aulas de Backend da Cubos Academy.

API feita com Express.js que manipula um banco de dados mockado que simula uma coleção de aulas e uma coleção de professores. A aplicação permite adicionar novas aulas para um professor, consultar todas as aulas ou uma aula especificada pelo id, além de permitir consultar a lista de professores e as aulas de um professor especificado pelo seu id. Também é possível atualizar o nome, descrição e os professores das aulas por meio dos métodos PUT e PATCH. Finalmente, também é possível deletar aulas por meio da API.

Neste projeto busquei individualizar os controladores e as rotas em arquivos separados do index. Além de encapsular os dados do baco de dados mockados de forma que ele so fosse manipulado diretamente pelo arquivo repository.js por meio de funções que são exportadas para utilização dos controladores.

Nas resposes, procurei utilizar os status codes que representassem acertivamente o status da requisição específica.

## CRUD

### Create
O endpoint POST "/teachers/:teacherId/classes" permite criar uma nova aula para o professor de id especificado:

![image](https://user-images.githubusercontent.com/115307935/230117613-26e76a81-73fd-41f1-9d30-7ec695dc89ea.png)

Os dados passam por validação para que uma nova aula só seja cadastrada caso ambos nome e descrição estejam presentes. Caso um dos dados esteja ausente, a API retorna um status code de bad request, uma mensagem coerente e a aula não é adicionada:

![image](https://user-images.githubusercontent.com/115307935/230119048-89c1e083-2e78-4db7-8130-1d64610c98ba.png)

Quando o id de professor não está cadastrado na base de dados, o servidor responde com 404, uma mensagem e a aula não é adicionada à database:

![image](https://user-images.githubusercontent.com/115307935/230119482-fad4fc8c-6a22-4034-b305-66b5d16ba9bd.png)

### Read
 É possível fazer consulta tando de professores, quando de aulas. Seja de todos os recursos ou de um recurso especificado pelo seu id.
 
 Talvez uma função interessande dessa API seja a busca de aulas lecionadas por determinado professor por meio do endpoint GET "/teachers/:teacherId/classes"
 
 ![image](https://user-images.githubusercontent.com/115307935/230121025-575544a8-d013-4264-8d60-88a1600bd757.png)

  Neste endpoint, quando o professor não existe, a API retorna o famosos 404 e uma mensagem amigável:
  
  ![image](https://user-images.githubusercontent.com/115307935/230121354-98f9f52c-085f-4c7a-9af3-00927f624185.png)


### Update [PUT]
  A atualização de dados está restrita às aulas e permite atualizá-la por completo por meio do endpoint PUT "/classes/classId":
  
  ![image](https://user-images.githubusercontent.com/115307935/230122270-499277fa-2b01-403c-95ab-53abb12e5f56.png)

  Neste endpoint, name, description e teachers_ids são dados obrigatórios e sofrem validação para que estejam presentes. Além disso, o último é validado para que seja uma array e que os ids escolhidos sejam de professores cadastrados:
  
  ![image](https://user-images.githubusercontent.com/115307935/230122681-564d5c1e-3efa-4cf5-a198-95e9d5948c3b.png)

  ![image](https://user-images.githubusercontent.com/115307935/230122848-80f72631-d885-4515-86ea-d9d5f44008b7.png)
  ![image](https://user-images.githubusercontent.com/115307935/230123790-d5ba8763-61ea-4d82-9c30-962996efb38d.png)
  
### Update [PATCH]
  Cada uma das chaves do objeto aula possui um endpoint separado para a atualização pelo PATCH e passa por validação para que o valor de uma chave não seja editado
fora do endpoint especificado:

![image](https://user-images.githubusercontent.com/115307935/230125975-9084a055-f8de-472e-8f88-069e3d936bf1.png)
![image](https://user-images.githubusercontent.com/115307935/230126133-b871ae77-734c-4ded-b5b0-8f84affee2a1.png)


### Delete
  Por meio do endpoint DETELE "/classes/classId" é possíel deletar a aula do id especificado, caso não haja aula cadastrada com esse id, a API retorna um 404:
  
  ![image](https://user-images.githubusercontent.com/115307935/230124586-26e02ea5-286e-48d6-b175-2d697423e115.png)
  ![image](https://user-images.githubusercontent.com/115307935/230124656-73c8d394-0c72-4f0d-ae6c-4b75db2a4cba.png)



