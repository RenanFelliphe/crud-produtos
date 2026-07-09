import { api } from "@/api/axiosInstance";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const callAPI = async () => {
      try {
        const response = await api.get('http://localhost:5000/users')
        console.log('response', response)
        // const data = await response.json()
        // console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    callAPI()
  }, [])

  const router = useRouter();

  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-screen w-full gap-5">
        <h1 className="text-[1.5rem]"> CRUD PRODUTOS </h1>

        <div className="text-[.7rem] flex items-center justify-center gap-5">
          {
            /* TODO: link para a página de cadastro (/produtos/novo) */
            <button onClick={() => router.push('/produtos')} className="border border-slate-400 rounded-lg px-5 py-2 flex items-center justify-center cursor-pointer hover:bg-purple-800"> LISTAR PRODUTO </button>
          }
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
