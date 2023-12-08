export interface iniciarReq {
    id: string,
    labirinto: string
};

export interface movimentarReq {
    id: string,
    labirinto: string,
    nova_posicao: number
};

export interface validarCaminhoReq {
    id: string,
    labirinto: string,
    todos_movimentos: number[]
};