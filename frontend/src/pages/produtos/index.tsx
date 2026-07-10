import { api } from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AxiosError } from "axios";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Produto {
  id: string
  nome: string
  descricao: string
  quantidade: number
  preco: number
}

export default function Produtos() {
  const router = useRouter()
  // TODO: estado para guardar a lista de produtos vinda da API
  const [produtos, setProdutos] = useState<Produto[]>([])

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

  const handleEditProduct = (productId: string) => { router.push(`/produtos/${productId}`) }

  const handleDeleteProduct = async (productId: string) => {

    try {
      const response = await api.delete(`/produtos/${productId}`)
      console.log('DELETAR', response)
      const removeProductFromState = produtos.filter(prod => prod.id !== productId)
      setProdutos(removeProductFromState)
    } catch (error) {
      if (error instanceof AxiosError) return console.warn(error?.response?.data)

      console.log(error)
    }
  }
  const handleAddNewProduct = () => {
    router.push('/produtos/novo')
  }

  const DeleteProduct = ({ nome, id }: { nome: string, id: string }) => {

    return (
      <Dialog>
        <DialogTrigger><Trash className="text-zinc-400 hover:text-zinc-100" /></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o produto <b>{nome}</b>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="items-left">
            <DialogClose>
              <Button variant={"link"}>Não</Button>
            </DialogClose>
            <DialogClose>
              <Button onClick={() => handleDeleteProduct(id)}>Sim</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      {/* TODO: link para a página de cadastro (/produtos/novo) */}
      <div className="flex h-screen items-center justify-center">
        <div className="max-w-4xl h-screen flex flex-col items-center justify-center gap-8">
          <div className="flex w-full items-center justify-end">
            <button className="flex gap-2 border border-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-200 hover:text-zinc-900  hover:border-zinc-400" onClick={handleAddNewProduct}>Adicionar novo produto <PlusCircle /></button>
          </div>
          <table>
            <thead className="p-2 border-b-2 border-zinc-300">
              <tr>
                <th className="px-4">Id</th>
                <th className="px-4">Nome</th>
                <th className="px-4">Descrição</th>
                <th className="px-4">Quantidade</th>
                <th className="px-4">Preço</th>
                <th className="px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(produto => {
                const priceAdjusted = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(produto.preco)
                return (
                  <tr key={produto.id}>
                    <td className="px-4">{produto.id}</td>
                    <td className="px-4">{produto.nome}</td>
                    <td className="px-4">{produto.descricao}</td>
                    <td className="px-4 text-center">{produto.quantidade}</td>
                    <td className="px-4">{priceAdjusted}</td>
                    <td>
                      <div className="flex gap-2 items-center justify-end">
                        <button onClick={() => handleEditProduct(produto.id)}><Pencil className="text-zinc-400 hover:text-zinc-100" /></button>
                        <DeleteProduct id={produto.id} nome={produto.nome} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* TODO: tabela listando os produtos (nome, preco, quantidade) */}
      {/* TODO: botão Editar -> leva para /produtos/[id] */}
      {/* TODO: botão Excluir -> chama DELETE /produtos/:id */}
    </>
  );
}
