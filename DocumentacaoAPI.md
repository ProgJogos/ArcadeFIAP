Aqui está a documentação da API do Arcade, ou seja, as funções que devem ser usadas para acessar funcionalidades específicas da máquina. Essa API está incluída no pacote linkado abaixo. Para utilizá-la, o prefab `ArcadeFIAP` deve ser incluído na primeira cena do jogo.

## Fluxo de jogo
O fluxo do jogo é controlado pelo prefab `ArcadeFIAP`. para isso, alguns comandos do sistema de Input são reservados para o funcionamento do arcade e por isso essas combinações de comandos **não devem ser usadas para a lógica interna do seu jogo**. Veja a lista abaixo:

- **HOME + START de qualquer jogador:** sai do jogo atual e vai para a tela de escolha de jogos.
- **HOME do jogador 1 + HOME do jogador 2:** reinicia o jogo atual.

## Input

Série de funções e valores para interagir com os controles do arcade. É obrigatório usar essas funções para o input dos jogos. Cada input tem uma alternativa no teclado, listadas abaixo. Os estudantes não devem utilizar o `InputManager` de seus projetos, ele será alterado pelo pacote da API. Se alguma função receber parâmetros inválidos (ex. jogador 3), erros vão aparecer no console.

Controle | Jogador 1 | Jogador 2
---------|-----------|----------
Direcional para cima | W | Cima
Direcional para esquerda | A | Esquerda
Direcional para baixo | S | Baixo
Direcional para direita | D | Direita
A | 1 | K 
B | 2 | L
Start | 3 | I
Menu | 4 | O

##### `enum EBotao`

Esse enum é usado como parâmetro para receber informações sobre cada um dos botões do arcade. Os valores possíveis são: `A`, `B`, `START` e `MENU`.

##### `enum EEixo`

Esse enum é usado para receber informações sobre o movimento direcional do jogador. Os valores possíveis são `VERTICAL` e  `HORIZONTAL`.

##### `bool ApertouBotao (int jogador, EBotao botao)`

Retorna `true` quando o botão foi pressionado **neste** frame. Parecido com `Input.GetButtonDown`.

##### `bool SoltouBotao (int jogador, EBotao botao)`

Retorna `true` quando o botão foi solto **neste** frame. Parecido com `Input.GetButtonUp`.

##### `bool BotaoApertado (int jogador, EBotao botao)`

Retorna `true` quando o botão está pressionado. Parecido com `Input.GetButton`.

##### `float Eixo (int jogador, EEixo eixo)`

Devolve o valor -1 a 1 relativo ao eixo direcional do jogador desejado. Parecido com o `Input.GetAxis`.