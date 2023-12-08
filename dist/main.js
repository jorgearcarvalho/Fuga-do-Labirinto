"use strict";
/*
    Jorge Augusto Rocha de Carvalho, 2022130009

    Projeto integrador 3B, Grafos. A fuga do labirinto.
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const graph_1 = require("./grafo/graph");
const methods_1 = require("./api-labirinto/methods");
const readline = __importStar(require("readline")); // Entrada do usuário.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const app = express_1.default();
app.use(express_1.default.json());
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(yield methods_1.listarLabirintos());
        const maze = yield escolheLabirinto();
        try {
            const labirinto = new graph_1.Grafo();
            // Iniciando o labirinto pela primeira vez para poder Efetuar busca.
            let verticeInicial = yield methods_1.iniciar({ id: 'teste', labirinto: maze });
            labirinto.adicionaVertice(verticeInicial);
            let visitados_DFS = new Set([verticeInicial.pos_atual]);
            console.log('\nProcurando a saída do labirinto', maze, '\n.\n..\n...');
            let caminho0 = [8];
            const primeiro_resultado = yield labirinto.DFS(maze, verticeInicial.movimentos[0], verticeInicial.pos_atual, verticeInicial.inicio, visitados_DFS, caminho0);
            console.log('\nCaminho 1: ', primeiro_resultado.c, ' Tamanho: ', primeiro_resultado.c.length), '\n';
            let caminho1 = [8];
            yield methods_1.iniciar({ id: 'teste', labirinto: maze });
            visitados_DFS = new Set();
            const segundo_resultado = yield labirinto.DFS(maze, verticeInicial.movimentos[1], verticeInicial.pos_atual, verticeInicial.inicio, visitados_DFS, caminho1);
            console.log('\nCaminho 2: ', segundo_resultado.c, ' Tamanho: ', segundo_resultado.c.length);
            let caminho2 = [8];
            yield methods_1.iniciar({ id: 'teste', labirinto: maze });
            visitados_DFS = new Set();
            const terceiro_resultado = yield labirinto.DFS(maze, verticeInicial.movimentos[2], verticeInicial.pos_atual, verticeInicial.inicio, visitados_DFS, caminho2);
            console.log('\nCaminho 3: ', terceiro_resultado.c, ' Tamanho: ', terceiro_resultado.c.length);
            let caminho3 = [8];
            yield methods_1.iniciar({ id: 'teste', labirinto: maze });
            visitados_DFS = new Set();
            const quarto_resultado = yield labirinto.DFS(maze, verticeInicial.movimentos[3], verticeInicial.pos_atual, verticeInicial.inicio, visitados_DFS, caminho3);
            console.log('\nCaminho 4: ', quarto_resultado.c, ' Tamanho: ', quarto_resultado.c.length, '\n');
            process.exit();
        }
        catch (error) {
            console.error(error);
        }
    });
}
;
main();
function escolheLabirinto() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question('Escolha um dos labirintos: ', (answer) => {
            const validos = ['large-maze', 'maze-sample-2', 'maze-sample', 'medium-maze', 'very-large-maze'];
            if (validos.includes(answer.toLowerCase())) {
                resolve(answer);
            }
            else {
                console.log('Labirinto escolhido inválido.');
                resolve('');
            }
        });
    });
}
