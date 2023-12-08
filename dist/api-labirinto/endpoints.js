"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENDPOINTS = void 0;
const API_URL = 'https://gtm.delary.dev';
// Definindo os endpoints
exports.ENDPOINTS = {
    INICIAR: `${API_URL}/iniciar`,
    MOVIMENTAR: `${API_URL}/movimentar`,
    VALIDAR_CAMINHO: `${API_URL}/valida_caminho`,
    ESTRUTURAR_GRAFO: `${API_URL}/labirintos`
};
