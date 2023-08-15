class CaixaDaLanchonete {

    
    itensDoCardapio = {
        "cafe": 3.00,
        "chantily": 1.50,
        "suco": 6.20,
        "sanduiche": 6.50,
        "queijo": 2.00,
        "salgado": 7.25,
        "combo1": 9.50,
        "combo2": 7.50
    };

    // constructor(){
    //     this.mostrarCardapio();
    // }

    // mostrarCardapio() {
    //     console.log("| codigo    | descrição                   | valor   |\n|-----------|-----------------------------|---------|\n| cafe      | Café                        | R$ 3,00 |\n| chantily  | Chantily (extra do Café)    | R$ 1,50 |\n| suco      | Suco Natural                | R$ 6,20 |\n| sanduiche | Sanduíche                   | R$ 6,50 |\n| queijo    | Queijo (extra do Sanduíche) | R$ 2,00 |\n| salgado   | Salgado                     | R$ 7,25 |\n| combo1    | 1 Suco e 1 Sanduíche        | R$ 9,50 |\n| combo2    | 1 Café e 1 Sanduíche        | R$ 7,50 |");
    // }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if(itens){
            let retornoVerifica = this.verificarItens(itens);
            console.log(retornoVerifica);
        } else {
            console.log("Não há itens no carrinho de compra!");
        }
        

        // this.verificarItens(itens);

        // this.metodoDePagamento(metodoDePagamento);

        return "";
    }

    separarItemDaQuantidade(itens){
        let itensSeparadosDaQuantidade = [];

        itens.forEach(e => {
            itensSeparadosDaQuantidade.push(e.split(','));
        });

        itensSeparadosDaQuantidade.forEach(e => {
            e[1] = Math.floor(parseInt(e[1]));            
        });
        // console.log(itensSeparadosDaQuantidade);

        return itensSeparadosDaQuantidade;
    }

    verificarItens(itens){
        let mensagem;
        let temItem = true;
        let temCafe = false;
        let temChantily = false;
        let temSanduiche = false;
        let temQueijo = false;
        if(itens.length > 0){

        itens = this.separarItemDaQuantidade(itens);

        // verificar se existem os itens -> "Item inválido!" FEITO
            itens.forEach(e => {
                if (!this.itensDoCardapio.hasOwnProperty(e[0])) {
                    temItem = false;
                }
            });

        if(temItem === false) {
            return mensagem = "Item inválido!";
        }

        // se item extra -> verificar se item principal foi solicitado antes do extra -> "Item extra não pode ser pedido sem o principal"

        for(let i = 0; i < itens.length; i++){
            if(itens[i][0] = "cafe"){
                temCafe = true;
            }
            if(itens[i][0] = "sanduiche"){
                temSanduiche = true;
            }
            if(itens[i][0] = "chantily"){
                temChantily = true;
            }
            if(itens[i][0] = "queijo"){
                temQueijo = true;
            }        
        }

        if(temChantily && !temCafe || temQueijo && !temSanduiche){
            return mensagem = "Item extra não pode ser pedido sem o principal";
        } else {
            return "tudo certo";
        }

        // verificar se há a quantidade de itens > 0 -> "Quantidade inválida!"

        } else {
            return mensagem = "Não há itens no carrinho de compra!";
        }

    }

    // verificarMetodoDePagamento(metodoDePagamento){
    //     if(metodoDePagamento === "debito"){
    //         retor
    //     }
    // }

}

export { CaixaDaLanchonete };

let cardapio = new CaixaDaLanchonete();
cardapio.calcularValorDaCompra("cartao", ["cafe,1.8", "chantily,3.2"]);

// cardapio.calcularValorDaCompra("cartao");