import { api } from "@/api/axiosInstance";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NovoProduto() {
  const router = useRouter();

  // TODO: um useState para cada campo do produto (nome, descricao, preco, quantidade)
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [quantidade, setQuantidade] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // TODO: POST /produtos com os dados do formulário
      const response = await api.post("/produtos", {
        nome,
        descricao,
        quantidade,
        preco
      });

      console.log(response.data);

      // TODO: redirecionar para /produtos após sucesso (useRouter)
      router.push('/produtos')

    } catch (error: any) {
      console.log(error.response?.data);
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full gap-5">
      <h1 className="text-[1.5rem]"> CADASTRAR PRODUTO </h1>

      <form onSubmit={handleSubmit} className="bg-zinc-900 relative border border-slate-400 rounded-xl flex flex-col gap-10 items-center justify-center min-w-100 p-10 pt-5">
        {/* TODO: tabela listando os produtos (nome, preco, quantidade) */
          <div className="w-full overflow-x-auto"></div>
        }

        {/* TODO: inputs controlados para nome, descricao, preco e quantidade */
          <div className="grid grid-cols-4 gap-y-7 gap-x-5">
            <div className="col-span-4 relative">
              <label htmlFor="nome" className="absolute -top-5 left-2 text-[.8rem]"> Nome </label>
              <input type="text" id="nome" placeholder="Digite o nome" className="bg-zinc-800 border border-slate-400 rounded-xl h-10 w-full px-5 outline-none" onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="col-span-2 relative">
              <label htmlFor="preco" className="absolute -top-5 left-2 text-[.8rem]"> Preço </label>
              <input type="number" id="preco" placeholder="Digite o preço" className="bg-zinc-800 border border-slate-400 rounded-xl h-10 w-full px-5 outline-none" onChange={(e) => setPreco(Number(e.target.value))} />
            </div>
            <div className="col-span-2 relative">
              <label htmlFor="quantidade" className="absolute -top-5 left-2 text-[.8rem]"> Quantidade </label>
              <input type="number" id="quantidade" placeholder="Digite a quantidade" className="bg-zinc-800 border border-slate-400 rounded-xl h-10 w-full px-5 outline-none" onChange={(e) => setQuantidade(Number(e.target.value))} />
            </div>
            <div className="col-span-4 relative">
              <label htmlFor="descricao" className="absolute -top-5 left-2 text-[.8rem]"> Descrição </label>
              <input type="text" id="descricao" placeholder="Digite a descrição" className="bg-zinc-800 border border-slate-400 rounded-xl h-10 w-full px-5 outline-none" onChange={(e) => setDescricao(e.target.value)} />
            </div>
          </div>
        }

        {/* TODO: botão de submit */}
        <button type="submit" className="border border-slate-400 bg-zinc-800 rounded-lg px-5 py-2 flex items-center justify-center cursor-pointer hover:bg-green-800"> ENVIAR </button>
      </form>

      <div className="text-[.7rem] flex items-center justify-center gap-5">
        {
          /* TODO: link para a página de cadastro (/produtos/novo) */
          <button onClick={() => router.push('/produtos')} className="border border-slate-400 rounded-lg px-5 py-2 flex items-center justify-center cursor-pointer hover:bg-purple-800"> LISTAR PRODUTO </button>
        }

        {/* TODO: botão Editar -> leva para /produtos/[id] */
          <button onClick={() => router.push('/')} className="border border-slate-400 rounded-lg px-5 py-2 flex items-center justify-center cursor-pointer hover:bg-sky-800"> ATUALIZAR PRODUTO </button>
        }

        {/* TODO: botão Excluir -> chama DELETE /produtos/:id */
          <button onClick={() => router.push('/')} className="border border-slate-400 rounded-lg px-5 py-2 flex items-center justify-center cursor-pointer hover:bg-red-800"> DELETAR PRODUTO </button>
        }
      </div>
    </div>
  )
}
