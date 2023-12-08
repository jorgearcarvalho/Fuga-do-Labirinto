/* 
    Jorge Augusto Rocha de Carvalho, 2022130009

    Projeto integrador 3B, Grafos. A fuga do labirinto.
*/

import express from "express";
import { Grafo } from "./grafo/graph";
import { iniciar, listarLabirintos } from "./api-labirinto/methods";
import * as readline from 'readline'             // Entrada do usuário.

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
app.use(express.json());

async function main() {
    console.log(await listarLabirintos());

    const maze: string = await escolheLabirinto();

    try 
    {
        const labirinto = new Grafo();

        // Iniciando o labirinto pela primeira vez para poder Efetuar busca.
        let verticeInicial = await iniciar({id: 'teste' , labirinto: maze});
        labirinto.adicionaVertice(verticeInicial);

        let visitados_DFS: Set<number> = new Set([verticeInicial.pos_atual]); 

        console.log('\nProcurando a saída do labirinto', maze, '\n.\n..\n...')

        let caminho0: number[] = [8]; 
        const primeiro_resultado = await labirinto.DFS(maze, verticeInicial.movimentos[0], verticeInicial.pos_atual, verticeInicial.inicio, visitados_DFS, caminho0);

        console.log('\nCaminho 1: ', primeiro_resultado.c, ' Tamanho: ', primeiro_resultado.c.length),'\n';


        let caminho1: number[] = [8];
        await iniciar({id: 'teste' , labirinto: maze});
        visitados_DFS = new Set();
        const segundo_resultado = await labirinto.DFS(maze, verticeInicial.movimentos[1], verticeInicial.pos_atual, verticeInicial.inicio, visitados_DFS, caminho1);
        console.log('\nCaminho 2: ', segundo_resultado.c, ' Tamanho: ', segundo_resultado.c.length,);


        let caminho2: number[] = [8];
        await iniciar({id: 'teste' , labirinto: maze});
        visitados_DFS = new Set();
        const terceiro_resultado = await labirinto.DFS(maze, verticeInicial.movimentos[2], verticeInicial.pos_atual, verticeInicial.inicio, visitados_DFS, caminho2);
        console.log('\nCaminho 3: ', terceiro_resultado.c, ' Tamanho: ', terceiro_resultado.c.length,);


        let caminho3: number[] = [8];
        await iniciar({id: 'teste' , labirinto: maze});
        visitados_DFS = new Set();
        const quarto_resultado = await labirinto.DFS(maze, verticeInicial.movimentos[3], verticeInicial.pos_atual, verticeInicial.inicio, visitados_DFS, caminho3);

        console.log('\nCaminho 4: ', quarto_resultado.c, ' Tamanho: ', quarto_resultado.c.length,'\n');
        
        process.exit();
    } 
    catch (error) 
    {
        console.error(error);
    }
};

main();



function escolheLabirinto(): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Escolha um dos labirintos: ', (answer) => {
            const validos = ['large-maze', 'maze-sample-2', 'maze-sample', 'medium-maze', 'very-large-maze'];
            if (validos.includes(answer.toLowerCase())) {
                resolve(answer);
            } else {
                console.log('Labirinto escolhido inválido.');
                resolve('');
            }
        });
    });
}


