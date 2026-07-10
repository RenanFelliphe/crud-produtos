import { api } from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NovoProduto() {
  // TODO: um useState para cada campo do produto (nome, descricao, preco, quantidade)

  interface IErro {
    field: string,
    message: string
  }

  let router = useRouter();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");

  const [erros, setErros] = useState({
    nomeErro: '',
    descricaoErro: '',
    quantidadeErro: '',
    precoErro: '',
  })

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
      setErros({
        nomeErro: '',
        descricaoErro: '',
        quantidadeErro: '',
        precoErro: '',
      })
      
      const createProduct = await api.post(`/produtos`, body)
      console.log('update', createProduct.data)
      router.push('/produtos')

    } catch (error) {
      if (error instanceof AxiosError) {

        const { fields } = error?.response?.data

        const novoErro = {
          nomeErro: '',
          descricaoErro: '',
          quantidadeErro: '',
          precoErro: '',
        }

        fields.map((erro: IErro) => {
          switch (erro.field) {
            case 'nome': {
              novoErro.nomeErro = erro.message
              break;
            }
            case 'descricao': {
              novoErro.descricaoErro = erro.message
              break;
            }
            case 'quantidade': {
              novoErro.quantidadeErro = erro.message
              break;
            }
            case 'preco': {
              novoErro.precoErro = erro.message
              break;
            }
          }

          setErros(novoErro)
          console.warn(novoErro)

          // return erros
        })
      }
    }

    // TODO: redirecionar para /produtos após sucesso (useRouter)
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-screen flex flex-col gap-2 items-center justify-center">
      {/* TODO: inputs controlados para nome, descricao, preco e quantidade */}
      <div className="flex flex-col">
        <label htmlFor="nome" className="text-[.9rem]">Nome do produto</label>
        <input className={`px-1 py-2 min-w-24 border ${erros.nomeErro ? 'border-red-400' : 'border-zinc-400'} rounded-md`} type="text" name="nome" onChange={(e) => setNome(e.target.value)} value={nome} />
        <p className="text-[.7rem] text-red-400 pl-1 pt-1">{erros.nomeErro} </p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="descricao" className="text-[.9rem]">Descrição do produto</label>
        <input className={`px-1 py-2 min-w-24 border ${erros.descricaoErro ? 'border-red-400' : 'border-zinc-400'} rounded-md`} type="text" name="descricao" onChange={(e) => setDescricao(e.target.value)} value={descricao} />
        <p className="text-[.7rem] text-red-400 pl-1 pt-1">{erros.descricaoErro}</p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="quantidade" className="text-[.9rem]">Quantidade do produto</label>
        <input className={`px-1 py-2 min-w-24 border ${erros.quantidadeErro ? 'border-red-400' : 'border-zinc-400'} rounded-md`} type="text" name="quantidade" onChange={(e) => setQuantidade(e.target.value)} value={quantidade} />
        <p className="text-[.7rem] text-red-400 pl-1 pt-1">{erros.quantidadeErro}</p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="preco" className="text-[.9rem]">Preço do produto</label>
        <input className={`px-1 py-2 min-w-24 border ${erros.precoErro ? 'border-red-400' : 'border-zinc-400'} rounded-md`} type="text" name="preco" onChange={(e) => setPreco(e.target.value)} value={preco} />
        <p className="text-[.7rem] text-red-400 pl-1 pt-1">{erros.precoErro}</p>
      </div>

      {/* TODO: botão de submit */}
      <button className="p-4 min-w-18 border border-zinc-300 bg-sky-700 text-white rounded-sm">Cadastrar</button>
    </form>
  );
}