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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCaminho = exports.movimentar = exports.iniciar = exports.listarLabirintos = void 0;
const endpoints_1 = require("./endpoints");
const node_fetch_1 = __importDefault(require("node-fetch"));
// Funcionalidade: retornar a lista de grafos possíveis
function listarLabirintos() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(endpoints_1.ENDPOINTS.ESTRUTURAR_GRAFO, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        return yield response.json();
    });
}
exports.listarLabirintos = listarLabirintos;
//  Funcionalidade: chamar a requisição /iniciar.
//  responsável por retornar o nó inicial do vértice, para podermos explorá-lo
function iniciar(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(endpoints_1.ENDPOINTS.INICIAR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        });
        const vertice1 = yield response.json();
        return vertice1;
    });
}
exports.iniciar = iniciar;
//  Funcionalidade: chamar a requisição /movimentar
//  Retorna o vértice seguinte
function movimentar(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(endpoints_1.ENDPOINTS.MOVIMENTAR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        });
        const prox_vertice = yield response.json();
        return prox_vertice;
    });
}
exports.movimentar = movimentar;
//  Funcionalidade: chamar a requisição /validar_movimento
//  retorna o indicador de validade
function validarCaminho(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(endpoints_1.ENDPOINTS.VALIDAR_CAMINHO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        });
        const isValid = yield response.json();
        return isValid;
    });
}
exports.validarCaminho = validarCaminho;
