class CaixaDaLanchonete {

    mensagem;
    itens;
    taxa;
    valor = 0;
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

    calcularValorDaCompra(metodoDePagamento, itens) {
        if(itens){
            
            if(this.verificarItens(itens)){

                if(this.verificarMetodoDePagamento(metodoDePagamento)){
                    
                    this.itens.forEach(e => {
                        this.valor += this.itensDoCardapio[e[0]] * e[1];
                    })

                    this.valor = this.valor * this.taxa;

                } else {
                    this.mensagem = "Forma de pagamento inválida!";
                }

            }

        } else {
            this.mensagem = "Não há itens no carrinho de compra!";
        }
        
        if(this.mensagem){
            return this.mensagem;
        } else {
            return `R$ ${this.valor.toFixed(2).toString().replace(".", ",")}`;
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

        this.itens = itensSeparadosDaQuantidade;

        return this.itens;
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
            this.mensagem = "Item inválido!";
            return false;
        }

        // Verificar se tem item extra + item principal
        itens.forEach(e => {
            if(e[0] === "cafe"){
                temCafe = true;
            }
            if(e[0] === "sanduiche"){
                temSanduiche = true;
            }
            if(e[0] === "chantily"){
                temChantily = true;
            }
            if(e[0] === "queijo"){
                temQueijo = true;
            }   
        });

        if(temChantily && !temCafe || temQueijo && !temSanduiche){
            this.mensagem = "Item extra não pode ser pedido sem o principal";
            return false;
        }

        // Virificar quantidade de itens
        itens.forEach(e => {
            if(!e[1] || e[1] < 1){
                temQuantidade = false;
            }            
        });

        if(!temQuantidade){
            this.mensagem = "Quantidade inválida!";
            return false;
        }

            return true;

        } else {
            this.mensagem = "Não há itens no carrinho de compra!"
            return false;
        }

    }

    verificarMetodoDePagamento(metodoDePagamento){
        if(metodoDePagamento === "debito"){
            this.taxa = 1;
            return true;
        }
        if(metodoDePagamento === "dinheiro"){
            this.taxa = 0.95;
            return true;
        }
        if(metodoDePagamento === "credito"){
            this.taxa = 1.03;
            return true;
        }

        return false;
    }

}

export { CaixaDaLanchonete };

let cardapio = new CaixaDaLanchonete();
cardapio.calcularValorDaCompra("debito", ["cafe,2", "chantily,3"]);