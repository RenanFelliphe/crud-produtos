import { api } from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NovoProduto() {
  // TODO: um useState para cada campo do produto (nome, descricao, preco, quantidade)
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    // TODO: POST /produtos com os dados do formulário
    const body = {
      nome,
      descricao,
      quantidade: Number(quantidade),
      preco: Number(preco)
    }
    try {
      const createProduct = await api.post(`/produtos`, body)
      console.log('update', createProduct.data)
      router.push('/produtos')
    } catch (error) {
      if (error instanceof AxiosError) return console.warn(error?.response?.data)
    }
    // TODO: redirecionar para /produtos após sucesso (useRouter)
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-screen flex flex-col items-center justify-center">
      {/* TODO: inputs controlados para nome, descricao, preco e quantidade */}
      <label htmlFor="">Nome do produto: </label>
      <input className="px-1 py-2 min-w-24 border border-zinc-400 rounded-md mb-5" type="text" name="nome" onChange={(e) => setNome(e.target.value)} value={nome} />

      <label htmlFor="">Descrição do produto: </label>
      <input className="px-1 py-2 min-w-24 border border-zinc-400 rounded-md mb-5" type="text" name="descricao" onChange={(e) => setDescricao(e.target.value)} value={descricao} />

      <label htmlFor="">Quantidade do produto: </label>
      <input className="px-1 py-2 min-w-24 border border-zinc-400 rounded-md mb-5" type="text" name="quantidade" onChange={(e) => setQuantidade(e.target.value)} value={quantidade} />

      <label htmlFor="">Preço do produto: </label>
      <input className="px-1 py-2 min-w-24 border border-zinc-400 rounded-md mb-5" type="text" name="preco" onChange={(e) => setPreco(e.target.value)} value={preco} />
      {/* TODO: botão de submit */}
      <button className="p-4 min-w-18 border border-zinc-300 bg-sky-700 text-white rounded-sm">Cadastrar</button>
    </form>
  );
}