import { Request, Response } from 'express'
import { db } from '../database/connection'

// GET /produtos (aceitar ?q= para busca por nome, ex: whereILike igual ao exemplo de /users)
export const getProducts = async (req: Request, res: Response) => {
    // TODO: buscar todos os produtos na tabela `produtos`
    // Dica: usar req.query.q para filtrar por nome (whereILike)
}

// GET /produtos/:id
export const getProductById = async (req: Request, res: Response) => {
    // TODO: buscar um produto pelo id (req.params.id)
    // Se não encontrar, retornar 404
}

// POST /produtos
export const createProduct = async (req: Request, res: Response) => {
    // TODO: inserir um novo produto (req.body: nome, descricao, preco, quantidade)
}

// PUT /produtos/:id
export const updateProduct = async (req: Request, res: Response) => {
    // TODO: atualizar um produto existente (req.params.id + req.body)
    // Se não encontrar, retornar 404
}

// DELETE /produtos/:id
export const deleteProduct = async (req: Request, res: Response) => {
    // TODO: remover um produto pelo id (req.params.id)
    // Se não encontrar, retornar 404
}
