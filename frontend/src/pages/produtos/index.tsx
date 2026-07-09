import { api } from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { Eye, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Produtos() {
  const router = useRouter()
  // TODO: estado para guardar a lista de produtos vinda da API
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    // TODO: buscar os produtos (GET /produtos) ao carregar a página
    const getProducts = async () => {
      try {
        const response = await api.get('/produtos')
        setProdutos(response.data.data)
      } catch (error) {
        if (error instanceof AxiosError) return console.warn(error?.response?.data)

        console.log(error)
      }
    }
    getProducts()
  }, []);

  const handleGetProduct = (productId: string) => { router.push(`/produtos/${productId}`) }
  const handleEditProduct = () => { }
  const handleDeleteProduct = () => { }

  return (
    <>
      {/* TODO: link para a página de cadastro (/produtos/novo) */}
      <div className="w-full h-screen flex items-center justify-center">
        <table>
          <thead className="p-2">
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.preco}</td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => handleGetProduct(produto.id)}><Eye className="text-zinc-400 hover:text-zinc-100" /></button>
                    <button onClick={handleEditProduct}><Pencil className="text-zinc-400 hover:text-zinc-100" /></button>
                    <button onClick={handleDeleteProduct}><Trash className="text-zinc-400 hover:text-zinc-100" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TODO: tabela listando os produtos (nome, preco, quantidade) */}
      {/* TODO: botão Editar -> leva para /produtos/[id] */}
      {/* TODO: botão Excluir -> chama DELETE /produtos/:id */}
    </>
  );
}
