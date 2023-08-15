class CaixaDaLanchonete {

    mensagem;
    valor;
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
            if(this.verificarItens(itens)){

                let retornoVerificaMetodo = this.verificarMetodoDePagamento(metodoDePagamento);
                if(retornoVerificaMetodo){

                    console.log("passou no metodo");

                    // fazer cálculo do valor a pagar

                    // tranformar para string e colocar R$ na frente

                } else {
                    this.mensagem = "Forma de pagamento inválida!";
                }

            }
        } else {
            this.mensagem = "Não há itens no carrinho de compra!";
        }
        
        if(this.mensagem){
            // return this.mensagem;
            console.log(this.mensagem);
        } else {
            return this.valor;
        }
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
        let temItem = true;
        let temCafe = false;
        let temChantily = false;
        let temSanduiche = false;
        let temQueijo = false;
        let temQuantidade = true;

        if(itens.length > 0){

        itens = this.separarItemDaQuantidade(itens);

        //  Verificar se existe item
        itens.forEach(e => {
            if (!this.itensDoCardapio.hasOwnProperty(e[0])) {
                temItem = false;
            }
        });

        if(temItem === false) {
            return this.mensagem = "Item inválido!";
        }

        // Verificar tem item extra + item principal
        for(let i = 0; i < itens.length; i++){
            if(itens[i][0] === "cafe"){
                temCafe = true;
            }
            if(itens[i][0] === "sanduiche"){
                temSanduiche = true;
            }
            if(itens[i][0] === "chantily"){
                temChantily = true;
            }
            if(itens[i][0] === "queijo"){
                temQueijo = true;
            }        
        }

        if(temChantily && !temCafe || temQueijo && !temSanduiche){
            return this.mensagem = "Item extra não pode ser pedido sem o principal";
        }

        // verificar se há a quantidade de itens > 0 -> "Quantidade inválida!"
        itens.forEach(e => {
            if(!e[1] || e[1] < 1){
                temQuantidade = false;
            }            
        });

        if(!temQuantidade){
            return this.mensagem = "Quantidade inválida!";
        }

        return true;

        } else {
            return this.mensagem = "Não há itens no carrinho de compra!";
        }

    }

    verificarMetodoDePagamento(metodoDePagamento){
        if(metodoDePagamento === "debito"){
            return 1;
        }
        if(metodoDePagamento === "dinheiro"){
            return 0.95;
        }
        if(metodoDePagamento === "credito"){
            return 1.03;
        }

        return false;
    }

}

export { CaixaDaLanchonete };

let cardapio = new CaixaDaLanchonete();
cardapio.calcularValorDaCompra("credito", ["sanduiche,3.2", "cafe,1", "queijo,6", "chantily, 3"]);