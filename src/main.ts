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

        let melhorCaminho: Array<number> = [];
        for (let k = 0; k < verticeInicial.movimentos.length; k++)
        {
            if (k === 0) 
            {
                const caminho: Array<number> = [verticeInicial.pos_atual];
                const resultado = await labirinto.DFS(maze, verticeInicial.movimentos[k], verticeInicial.pos_atual, verticeInicial.inicio, visitados_DFS, caminho);

                while (resultado.c. length > 0 && resultado.c[resultado.c.length - 1] !== labirinto.v_final)
                {
                    resultado.c.pop();
                }

                console.log(`Caminho ${k}: ${resultado.c} Tamanho: ${resultado.c.length}`);
            }
            else {
                await iniciar({id: 'teste' , labirinto: maze});
                visitados_DFS = new Set();

                const caminho: Array<number> = [verticeInicial.pos_atual];
                const resultado = await labirinto.DFS(maze, verticeInicial.movimentos[k], verticeInicial.pos_atual, verticeInicial.inicio, visitados_DFS, caminho);
            
                while (resultado.c[resultado.c.length - 1] !== labirinto.v_final)
                {
                    resultado.c.pop();
                }

                console.log(`Caminho ${k}: ${resultado.c} Tamanho: ${resultado.c.length}`);
            }
        }
        
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
