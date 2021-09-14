import db from './db.js';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());


app.get('/produto', async (req, resp) => {
    try {
        let produto = await db.tb_produto.findAll({order: [["id_produto","desc"]]});
        resp.send(produto);
    } catch (e) {
        resp.send({ erro: 'Ocorreu um erro!' })
    }
})

app.post('/produto', async (req, resp) => {
    try {
        
        let prod = req.body;
       
        if(isNaN(prod.avaliacao) || prod.avaliacao < 0 || prod.avaliacao > 10) {
            return resp.send({erro: 'O campo Avaliação inválido'});
        }

        if(isNaN(prod.precoDe) || prod.precoDe < 0) {
            return resp.send({erro: 'O campo Preço DE inválido'});
        }

        if(isNaN(prod.precoPor) || prod.precoPor < 0) {
            return resp.send({erro: 'O campo Preço POR inválido'});
        }

        if(isNaN(prod.estoque) || prod.estoque < 0) {
            return resp.send({erro: 'O campo Estoque inválido'});
        }
        if(prod.nomeProduto == "") {
            return resp.send({erro: 'O campo Nome é obrigatório'})
        }
        if(prod.categoria == "") {
            return resp.send({erro: 'O campo Categoria é obrigatório'})
        }
        if(prod.avaliacao == "") {
            return resp.send({erro: 'O campo Avaliação é obrigatório'})
        }
        if(prod.imagem == "") {
            return resp.send({erro: 'O campo Link imagem é obrigatório'})
        }
        if( prod.descricao == "") {
            return resp.send({erro: 'O campo Descrição é obrigatório'})
        }
        if(prod.precoDe == "") {
            return resp.send({erro: 'O campo Preco DE é obrigatório'})
        }
        if( prod.precoPor == "") {
            return resp.send({erro: 'O campo Preco POR é obrigatório'})
        }
        if(prod.estoque == "") {
            return resp.send({erro: 'O campo Estoque é obrigatório'})
        }




        let contem = await db.tb_produto.findOne({where: {nm_produto: prod.nomeProduto}});
        if(contem != null) {
            return resp.send({erro: 'Produto ja existe!'});
        }

        let r = await db.tb_produto.create({
            nm_produto: prod.nomeProduto,
            ds_categoria: prod.categoria,
            vl_preco_de: prod.precoDe,
            vl_preco_por:  prod.precoPor,
            vl_avaliacao: prod.avaliacao,
            ds_produto: prod.descricao,
            qtd_estoque: prod.estoque,
            img_produto: prod.imagem,
            bt_ativo: true,
            dt_inclusao: new Date()
        })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: 'Ocorreu um erro!' })
    }
})


app.put('/produto/:id', async (req, resp) => {

    try {
        let id = req.params.id;
        let prod = req.body;

        let r = await db.tb_produto.update(
            
            {   nm_produto: prod.nmproduto,
                ds_categoria: prod.categoria,
                vl_preco_de: prod.precoDe,
                vl_preco_por:  prod.precoPor,
                vl_avaliacao: prod.avaliacao,
                ds_produto: prod.descricao,
                qtd_estoque: prod.estoque,
                img_produto: prod.imagem,
                bt_ativo: true,
                dt_inclusao: new Date()
            },
            {
                where: { id_produto: id }
            });

        resp.sendStatus(200);


    } catch (e) {
        resp.send({ erro: e.toString() });
    }


})

app.delete('/produto/:id', async (req, resp) => {
    try {
        let r = await db.tb_produto.destroy({ where: { id_produto: req.params.id } });
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() });
    }
})

app.listen(process.env.PORT,
x => console.log(`Server up at port ${process.env.PORT}`))