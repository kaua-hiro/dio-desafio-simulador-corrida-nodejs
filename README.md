# Desafio de Código DIO: Simulador de Corrida Estilo Mario Kart

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📖 Sobre o Projeto

Este projeto é uma solução para um **Desafio de Código** proposto no bootcamp **[Mobile Developer](https://web.dio.me/track/meutudo-mobile-developer?tab=about)** da [Digital Innovation One (DIO)](https://www.dio.me/).

O desafio consistia em desenvolver um simulador de corridas inspirado no clássico Mario Kart, com toda a lógica executada no backend utilizando Node.js. O objetivo era focar na criação da lógica de jogo, manipulação de estado e interatividade do usuário através do terminal, sem a necessidade de uma interface gráfica.

## ✨ Funcionalidades

-   **Simulação em Terminal**: Toda a corrida, movimentação e interações acontecem no console.
-   **Jogador vs. IA**: Você controla um personagem enquanto outros são controlados por uma IA básica.
-   **Sistema de Itens**: Colete e use itens clássicos como Cogumelo, Casco Verde e Banana.
-   **Lógica de Status**: Personagens podem sofrer efeitos como `boost` (velocidade aumentada) ou `spin_out` (paralizado).
-   **Renderização Dinâmica**: A pista e a posição dos corredores são atualizadas e exibidas a cada "turno" da corrida.

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido inteiramente com:

-   **[Node.js](https://nodejs.org/)**: Ambiente de execução para o JavaScript no servidor/backend.
-   **JavaScript (ES6+)**: Linguagem principal, utilizando conceitos de Classes, Módulos e Programação Assíncrona (`setInterval`).

## 🚀 Como Executar

Para rodar este projeto em sua máquina local, siga os passos abaixo.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
-   [Git](https://git-scm.com/)

### Passos

1.  Clone o repositório:
    ```bash
    git clone https://github.com/kaua-hiro/dio-desafio-simulador-corrida-nodejs.git
    ```

2.  Navegue até o diretório do projeto:
    ```bash
    cd dio-desafio-simulador-corrida-nodejs
    ```
    
3.  Inicie o simulador:
    ```bash
    node index.js
    ```

## 🎮 Como Jogar

-   A corrida iniciará automaticamente. Você controla o personagem **Mario**.
-   Ao passar por uma caixa de item (`?`), você coletará um item aleatório.
-   Pressione a tecla `u` para usar o item que você está segurando.
-   Pressione `Ctrl` + `C` para sair do jogo a qualquer momento.

---

*Este projeto foi desenvolvido com fins educacionais como parte de um desafio de código da DIO.*
