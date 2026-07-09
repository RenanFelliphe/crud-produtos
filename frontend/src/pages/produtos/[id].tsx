import { api } from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// [id].tsx é uma rota dinâmica do Next.js: o valor entre colchetes vira um
// parâmetro acessível via useRouter().query.id (ex: /produtos/3 -> id = "3")
export default function EditarProduto() {
  const router = useRouter();
  const { id } = router.query;
  const [produto, setProduto] = useState(null);
  const [nome, setNome] = useState("1");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");

  // TODO: um useState para cada campo do produto (nome, descricao, preco, quantidade)
  useEffect(() => {
    // TODO: buscar o produto (GET /produtos/:id) e preencher o formulário
    if (id) {
      const getProduct = async () => {
        try {
          const response = await api.get(`/produtos/${id}`)
          if (response.data.data.length > 0) {
            setProduto(response.data.data[0])
            setNome(response.data.data[0].nome)
            setDescricao(response.data.data[0].descricao)
            setPreco(response.data.data[0].preco)
            setQuantidade(response.data.data[0].quantidade)
          }
        } catch (error) {
          if (error instanceof AxiosError) return console.warn(error?.response?.data)

          console.log(error)
        }
      }
      getProduct()
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: PUT /produtos/:id com os dados atualizados

    const body = {
      nome,
      descricao,
      quantidade: Number(quantidade),
      preco: Number(preco)
    }
    try {
      const updateProduct = await api.put(`/produtos/${id}`, body)
      console.log('update', updateProduct.data)
      router.push('/produtos')
    } catch (error) {
      if (error instanceof AxiosError) return console.warn(error?.response?.data)
    }
    // TODO: redirecionar para /produtos após sucesso
  };

  return (
    <>
      {produto && (
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
          <button className="p-4 min-w-18 border border-zinc-300 bg-sky-700 text-white rounded-sm">Atualizar</button>
        </form>
      )}
    </>
  );
}
