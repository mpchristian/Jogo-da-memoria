
# Memory Game
Este projeto é um jogo da memória utilizando os fundamentos de desenvolvimento
web. O usuário seleciona o nível de dificudade, definido de acordo com a dimensão
do quadro. Cada acerto contabiliza 100 pontos, ao passo que cada erro subtrai
10.

As imagens do jogo são aleatórias e obtidas através desta [API](https://picsum.photos/).
A abordagem utilizada consiste em atribuir um id específico a cada pixel.
Um algoritmo é executado para definir os pares de ids, que se referem
às posições aleatórias de cada par de imagens. O DOM (Document Object Model)
é utilizado para controlar os elementos com os quais o usuário interage.


## Demonstração

<img src="memory-game-demo.gif" alt="Memory game demo" width="600px">


## Tecnologias

HTML, CSS, JavaScript


## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:mpchristian/Memory-game.git
```

Entre no diretório do projeto

```bash
  cd Memory-game
```

Abra o arquivo `index.html` com seu navegador. Caso utilize o Google Chrome,
basta utilizar o comando

```bash
  google-chrome index.html
```

## Referência

 - [Lorem Picsum API](https://picsum.photos/)


## Feedback

Se você tiver algum feedback, por favor envie para christianp3m@gmail.com