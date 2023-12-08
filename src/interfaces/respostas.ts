interface Vertx {
    pos_atual: number,
    inicio: boolean,
    final: boolean,
    movimentos: number[],
}

interface caminhoValido {
    caminho_valido: boolean,
    quantidade_movimentos: number
}