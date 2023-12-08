"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grafo = void 0;
const methods_1 = require("../api-labirinto/methods");
class Grafo {
    constructor() {
        this.arranjoVertices = new Map();
    }
    // Adiciona um novo vertice no grafo
    adicionaVertice(vertice) {
        this.arranjoVertices.set(vertice.pos_atual, []);
    }
    // Adiciona arestas no grafo
    adicionaAresta(vertice1, vertice2) {
        var _a, _b;
        (_a = this.arranjoVertices.get(vertice1)) === null || _a === void 0 ? void 0 : _a.push(vertice2);
        (_b = this.arranjoVertices.get(vertice2)) === null || _b === void 0 ? void 0 : _b.push(vertice1);
    }
    // Define a lista de vizinhos do vertice
    definirVizinhos(vertx) {
        if (vertx.movimentos) {
            vertx.movimentos.forEach((movimento) => {
                if (!movimento) {
                    console.log('Não há movimentos possíveis.');
                }
                ;
                this.adicionaAresta(vertx.pos_atual, movimento);
            });
        }
        return vertx.movimentos || [];
    }
    DFS(maze, vertice, pai, inicio, visitados, c) {
        return __awaiter(this, void 0, void 0, function* () {
            // Movimenta para o primeiro vertice, marca como visitado.
            const vertice_atual = yield methods_1.movimentar({ id: 'teste', labirinto: maze, nova_posicao: vertice });
            visitados.add(vertice);
            // Adiciona o vertice no vetor do caminho e incrementa o tamanho dele.
            c.push(vertice);
            // Se vertice Final, printa
            if (vertice_atual.final === true) {
                console.log('\nAchei! A saída está no vertice: ', vertice_atual.pos_atual);
                return { c };
            }
            ;
            for (const movimento in vertice_atual.movimentos) {
                if (!visitados.has(vertice_atual.movimentos[movimento])) {
                    yield this.DFS(maze, vertice_atual.movimentos[movimento], vertice_atual.pos_atual, vertice_atual.inicio, visitados, c);
                }
            }
            if (inicio === false && vertice_atual.final == false) {
                yield methods_1.movimentar({ id: 'teste', labirinto: maze, nova_posicao: pai });
            }
            return { c };
        });
    }
    // Não tive habilidade para desenvolver um BFS que fosse capaz de realizar os movimentos de busca
    // nos filhos dos vértices filhos.
    BFS(maze, vertice, inicio) {
        return __awaiter(this, void 0, void 0, function* () {
            const visitados = new Set();
            visitados.add(vertice.pos_atual);
            const fila = this.definirVizinhos(vertice);
            const listaPais = new Map();
            const primeiro_pai = vertice.pos_atual;
            for (let k = 0; k < vertice.movimentos.length; k++) {
                listaPais.set(vertice.movimentos[k], primeiro_pai);
            }
            console.log("\nPrimeiro vertice: ", vertice.pos_atual);
            console.log("Fila: ", fila);
            console.log('-------------------------------------');
            while (fila.length > 0) {
                try {
                    // Tira o vértice da fila
                    const verticeAtual = fila.shift();
                    console.log(listaPais);
                    const novoVertice = yield methods_1.movimentar({ id: "teste", labirinto: "maze-sample", nova_posicao: verticeAtual });
                    // Adiciona o vértice
                    this.adicionaVertice(novoVertice);
                    visitados.add(novoVertice.pos_atual);
                    novoVertice.movimentos.forEach((movimento) => __awaiter(this, void 0, void 0, function* () {
                        if (!visitados.has(movimento)
                            && !fila.includes(movimento)
                            && (yield methods_1.validarCaminho({ id: 'teste', labirinto: maze, todos_movimentos: [novoVertice.pos_atual, movimento] }))) {
                            listaPais.set(movimento, novoVertice.pos_atual);
                            fila.push(movimento);
                        }
                    }));
                    const novoPai = listaPais.get(verticeAtual);
                    console.log('Vertice: ', novoVertice.pos_atual, ' Pai: ', novoPai);
                    console.log('inicio? ', novoVertice.inicio, 'final?', novoVertice.final, ' Caminhos: ', novoVertice.movimentos);
                    console.log('Visitados: ', visitados, '\n');
                    console.log('Fila:', fila);
                    console.log('-----------------------------------');
                    // Consulta se é o vértice final          // implementar logica de retorno do caminho
                    if (novoVertice.final === true) {
                        console.log("\nVértice final: ", novoVertice.pos_atual);
                        process.exit();
                    }
                    ;
                    // Implementar retorno ao pai
                    if (listaPais.has(verticeAtual)) {
                        console.log('Retorno: ', novoPai);
                        yield methods_1.movimentar({ id: "teste", labirinto: maze, nova_posicao: novoPai });
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
            console.log("Vertices visitados: ", visitados);
            console.log("Lista dos pais: ", listaPais);
        });
    }
}
exports.Grafo = Grafo;
