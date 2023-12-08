import { movimentar, validarCaminho } from "../api-labirinto/methods";

export class Grafo {
  private arranjoVertices: Map<number, number[]>;

  constructor() {
    this.arranjoVertices = new Map();
  }

  // Adiciona um novo vertice no grafo
  adicionaVertice(vertice: Vertx) {
    this.arranjoVertices.set(vertice.pos_atual, []);
  }

  // Adiciona arestas no grafo
  adicionaAresta(vertice1: number, vertice2: number) {
    this.arranjoVertices.get(vertice1)?.push(vertice2);
    this.arranjoVertices.get(vertice2)?.push(vertice1);
  }

  // Define a lista de vizinhos do vertice
  definirVizinhos(vertx: Vertx): number[] {
    if (vertx.movimentos) {
        vertx.movimentos.forEach((movimento) => {
            if(!movimento) {console.log('Não há movimentos possíveis.')};
            this.adicionaAresta(vertx.pos_atual, movimento);
        });
    }
    return vertx.movimentos || [];
 }

 async DFS(maze:string, vertice: number, pai: number, inicio: boolean, visitados: Set<number>, c: number[]): Promise<{c: number[]}> {
  
  // Movimenta para o primeiro vertice, marca como visitado.
  const vertice_atual = await movimentar({id: 'teste', labirinto: maze, nova_posicao: vertice});
  visitados.add(vertice);
  
  // Adiciona o vertice no vetor do caminho e incrementa o tamanho dele.
  c.push(vertice);

  // Se vertice Final, printa
  if(vertice_atual.final === true) { 
    console.log('\nAchei! A saída está no vertice: ', vertice_atual.pos_atual); 
    return {c}; 
  };

  for (const movimento in vertice_atual.movimentos)
  {
    if (!visitados.has(vertice_atual.movimentos[movimento])) 
    {
      await this.DFS(maze, vertice_atual.movimentos[movimento], vertice_atual.pos_atual, vertice_atual.inicio, visitados, c);
    }
  } 

  if (inicio === false && vertice_atual.final == false) 
  {
    await movimentar({id: 'teste', labirinto: maze, nova_posicao: pai});
  }
  return {c};
}


  // Não tive habilidade para desenvolver um BFS que fosse capaz de realizar os movimentos de busca
  // nos filhos dos vértices filhos.
  
  async BFS(maze: string, vertice: Vertx, inicio: boolean){
    const visitados: Set<number> = new Set();
    visitados.add(vertice.pos_atual);

    const fila: number[] = this.definirVizinhos(vertice);

    const listaPais: Map<number, number> = new Map();

    const primeiro_pai = vertice.pos_atual;
    for (let k = 0; k < vertice.movimentos.length; k ++)
    {
      listaPais.set(vertice.movimentos[k], primeiro_pai);
    }

    console.log("\nPrimeiro vertice: ", vertice.pos_atual);
    console.log("Fila: ", fila);
    console.log('-------------------------------------');

    while(fila.length > 0)
      {
        try 
        { 
          // Tira o vértice da fila
          const verticeAtual = fila.shift()!;

          console.log(listaPais);

          const novoVertice = await movimentar({id: "teste", labirinto: "maze-sample", nova_posicao: verticeAtual});
          // Adiciona o vértice
          this.adicionaVertice(novoVertice);

          visitados.add(novoVertice.pos_atual);

          novoVertice.movimentos.forEach(async movimento => 
            {
              if(!visitados.has(movimento) 
                  && !fila.includes(movimento) 
                  && await validarCaminho(
                    {id: 'teste', labirinto: maze, todos_movimentos: [novoVertice.pos_atual, movimento]}
                  )
                ) 
              {
                listaPais.set(movimento, novoVertice.pos_atual);
                fila.push(movimento);
              }
            
          });

          const novoPai = listaPais.get(verticeAtual)!;

          console.log('Vertice: ', novoVertice.pos_atual, ' Pai: ', novoPai);
          console.log('inicio? ', novoVertice.inicio, 'final?', novoVertice.final, ' Caminhos: ',novoVertice.movimentos);
          console.log('Visitados: ', visitados, '\n');

          console.log('Fila:' , fila);
          console.log('-----------------------------------')

          // Consulta se é o vértice final          // implementar logica de retorno do caminho
          if(novoVertice.final === true) {console.log("\nVértice final: ", novoVertice.pos_atual); process.exit()};

          // Implementar retorno ao pai
          if (listaPais.has(verticeAtual)) {
            console.log('Retorno: ', novoPai);
            await movimentar({id: "teste", labirinto: maze, nova_posicao: novoPai});  
          }
      } 
        catch(error)
        {
            console.error(error);
        }
      }
      console.log("Vertices visitados: ", visitados);
      console.log("Lista dos pais: ", listaPais)
  }

 
}