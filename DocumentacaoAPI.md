# Documentação da API do ArcadeFIAP

Aqui está a documentação da API do Arcade, ou seja, as funções que devem ser usadas para acessar funcionalidades específicas da máquina. Para utilizá-la, o script *ArcadeFIAP.cs* deve estar na pasta `Assets` de seu projeto e o arquivo *InputManager.asset* deve estar na pasta `ProjectSettings`.

## Fluxo de jogo
No software final, o fluxo do jogo é controlado por uma classe `GerenteArcade`. Para isso, alguns comandos do sistema de input são reservados para o funcionamento dessa classe e por isso esses comandos **não devem ser usadas para a lógica interna do seu jogo**. Veja a lista abaixo:

- **HOME + START de qualquer jogador:** sai do jogo atual e vai para a tela de escolha de jogos.
- **HOME do jogador 1 + HOME do jogador 2:** reinicia o jogo atual.

## Input

Série de funções e valores para interagir com os controles do arcade, que são acessadas através da classe estática  `ArcadeFIAP`. É obrigatório usar essas funções para o input dos jogos. Cada input tem uma alternativa no teclado, listadas abaixo. Os estudantes não devem utilizar o `InputManager` de seus projetos, ele será alterado pelo pacote da API. Se alguma função receber parâmetros inválidos (ex. jogador 3), erros vão aparecer no console.

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

```csharp
if (ArcadeFIAP.ApertouBotao(2, EBotao.A) {
  Pular();
}
```

##### `bool SoltouBotao (int jogador, EBotao botao)`

Retorna `true` quando o botão foi solto **neste** frame. Parecido com `Input.GetButtonUp`.

```csharp
if (ArcadeFIAP.SoltouBotao(1, EBotao.B) {
  Atirar();
}
```

##### `bool BotaoApertado (int jogador, EBotao botao)`

Retorna `true` quando o botão está pressionado. Parecido com `Input.GetButton`.

```csharp
if(ArcadeFIAP.BotaoApertado(2, EBotao.B)) {
  print("P2 B está apertado");
}
else {
  print("P2 B não está apertado");
}
```

##### `float Eixo (int jogador, EEixo eixo)`

Devolve o valor -1 a 1 relativo ao eixo direcional do jogador desejado. Parecido com o `Input.GetAxis`.

```csharp
float dir = ArcadeFIAP.Eixo (1, EEixo.HORIZONTAL);
rigidbody.velocity = new Vector3 (dir * velocidade, 0, 0);
```