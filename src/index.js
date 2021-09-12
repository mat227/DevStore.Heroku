import db from './db.js';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());


app.get('/produto', async (req, resp) => {
    try {
        let produto = await db.tb_produto.findAll();
        resp.send(produto);
    } catch (e) {
        resp.send({ erro: 'Ocorreu um erro!' })
    }
})

app.post('/produto', async (req, resp) => {
    try {
        let prod = req.body;

        let r = await db.tb_produto.create({
            nm_produto: prod.nmproduto,
            ds_categoria: prod.categoria,
            vl_preco_de: prod.precode,
            vl_preco_por:  prod.precopor,
            vl_avaliacao: prod.avaliacao,
            ds_produto: prod.dsproduto,
            qtd_estoque: prod.estoque,
            img_produto: prod.img,
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
            
            {     nm_produto: prod.nmproduto,
                ds_categoria: prod.categoria,
                vl_preco_de: prod.precode,
                vl_preco_por:  prod.precopor,
                vl_alaliacao: prod.avaliacao,
                ds_produto: prod.dsproduto,
                qtd_estoque: prod.estoque,
                Img_produto: prod.img,
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