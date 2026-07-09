import { api } from "@/api/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IProduto {
  id: number,
  nome: string,
  quantidade: number,
  preco: number
}

export default function Produtos() {
  // TODO: estado para guardar a lista de produtos vinda da API
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const router = useRouter();

  useEffect(() => {
    // TODO: buscar os produtos (GET /produtos) ao carregar a página
    const buscaProdutos = async () => {
      const response = await api.get("http://localhost:5000/produtos")

      console.log(response.data.data)

      setProdutos(response.data.data)
    }

    buscaProdutos();
  }, []);

  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-screen w-full gap-5">
        <h1 className="text-[1.5rem]"> LISTA DE PRODUTOS </h1>
        <div className="relative">
          <div className="relative border border-slate-400 rounded-xl flex flex-col items-center justify-center min-w-180 overflow-hidden">
            {/* TODO: tabela listando os produtos (nome, preco, quantidade) */
              <div className="w-full overflow-x-auto">
                <table className="min-w-full border-collapse bg-slate-900 text-left text-sm shadow-sm">
                  <thead className="bg-zinc-800">
                    <tr>
                      <th className="px-4 py-3 font-semibold">ID</th>
                      <th className="px-4 py-3 font-semibold">Nome</th>
                      <th className="px-4 py-3 font-semibold">Quantidade</th>
                      <th className="px-4 py-3 font-semibold">Preço</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {
                      produtos.map((produto) => (
                        <tr key={produto.id} className="bg-zinc-900 hover:bg-zinc-800">
                          <td className="px-4 py-3">{produto.id}</td>
                          <td className="px-4 py-3">{produto.nome}</td>
                          <td className="px-4 py-3">{produto.quantidade}</td>
                          <td className="px-4 py-3">{produto.preco}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
        <div className="text-[.7rem] flex items-center justify-center gap-5">
          {
            /* TODO: link para a página de cadastro (/produtos/novo) */
            <button onClick={() => router.push('/produtos/novo')} className="border border-slate-400 rounded-lg px-5 py-2 flex items-center justify-center cursor-pointer hover:bg-green-800"> CADASTRAR PRODUTO </button>
          }

          {/* TODO: botão Editar -> leva para /produtos/[id] */
            <button onClick={() => router.push('/')} className="border border-slate-400 rounded-lg px-5 py-2 flex items-center justify-center cursor-pointer hover:bg-sky-800"> ATUALIZAR PRODUTO </button>
          }

          {/* TODO: botão Excluir -> chama DELETE /produtos/:id */
            <button onClick={() => router.push('/')} className="border border-slate-400 rounded-lg px-5 py-2 flex items-center justify-center cursor-pointer hover:bg-red-800"> DELETAR PRODUTO </button>
          }
        </div>
      </div>
    </>
  );
}
