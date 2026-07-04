import { Request, Response } from 'express'
import { db } from '../database/connection'

// GET /produtos (aceitar ?q= para busca por nome, ex: whereILike igual ao exemplo de /users)
export const getProducts = async (req: Request, res: Response) => {
    // Dica: usar req.query.q para filtrar por nome (whereILike)
    const q = req.query.q as string
    let produtos

    try {
        if (q) {
            produtos = await db.select('*').from('produtos').whereILike('nome', `%${q}%`)

        } else {
            // TODO: buscar todos os produtos na tabela `produtos`
            produtos = await db.select('*').from('produtos')
        }

        return res.json(produtos)
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar produtos.' });
    }
}

// GET /produtos/:id
export const getProductById = async (req: Request, res: Response) => {
    // TODO: buscar um produto pelo id (req.params.id)
    const id = req.params.id as string
    let produtos

    try {
        produtos = await db.select('*').from('produtos').where('id', id)

        // Se não encontrar, retornar 404
        if (produtos.length == 0) {
            return res.status(400).json({ message: "Erro! Produto não encontrado" })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar produtos.' })
    }

    return res.json(produtos)
}

// POST /produtos
export const createProduct = async (req: Request, res: Response) => {
    // TODO: inserir um novo produto (req.body: nome, descricao, preco, quantidade)

    await db('produtos').insert({
        'nome': req.body.nome,
        'descricao': req.body.descricao,
        'preco': req.body.preco,
        'quantidade': req.body.quantidade,
    })
}

// PUT /produtos/:id
export const updateProduct = async (req: Request, res: Response) => {
    // TODO: atualizar um produto existente (req.params.id + req.body)
    // Se não encontrar, retornar 404
    const id = req.params.id as string

    await db('produtos').update({
        'nome': req.body.nome,
        'descricao': req.body.descricao,
        'preco': req.body.preco,
        'quantidade': req.body.quantidade,
    }).where({'id': id})
}

// DELETE /produtos/:id
export const deleteProduct = async (req: Request, res: Response) => {
    // TODO: remover um produto pelo id (req.params.id)
    const id = req.params.id

    await db('produtos').where({ 'id': id }).del()

    // Se não encontrar, retornar 404
}
