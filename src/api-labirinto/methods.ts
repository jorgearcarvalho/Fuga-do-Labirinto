import { iniciarReq, movimentarReq, validarCaminhoReq } from "../interfaces/requisicoes";
import { ENDPOINTS } from "./endpoints";
import fetch from "node-fetch"

// Funcionalidade: retornar a lista de grafos possíveis
export async function listarLabirintos() 
{
    const response = await fetch(ENDPOINTS.ESTRUTURAR_GRAFO, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
    return await response.json();
 }

//  Funcionalidade: chamar a requisição /iniciar.
//  responsável por retornar o nó inicial do vértice, para podermos explorá-lo

export async function iniciar(req: iniciarReq): Promise<Vertx>
{
    const response = await fetch(ENDPOINTS.INICIAR, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(req)
    });

    const vertice1: Vertx = await response.json();
    return vertice1;
}

//  Funcionalidade: chamar a requisição /movimentar
//  Retorna o vértice seguinte

export async function movimentar(req: movimentarReq): Promise<Vertx>
{
    const response = await fetch(ENDPOINTS.MOVIMENTAR, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(req)
    });

    const prox_vertice: Vertx = await response.json();
    return prox_vertice;
}

//  Funcionalidade: chamar a requisição /validar_movimento
//  retorna o indicador de validade

export async function validarCaminho(req: validarCaminhoReq): Promise<boolean>
{
    const response = await fetch(ENDPOINTS.VALIDAR_CAMINHO, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(req)
    });
    const isValid = await response.json();
    return isValid;
}
 
   
   