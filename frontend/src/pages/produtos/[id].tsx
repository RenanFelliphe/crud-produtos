import { api } from "@/api/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// [id].tsx é uma rota dinâmica do Next.js: o valor entre colchetes vira um
// parâmetro acessível via useRouter().query.id (ex: /produtos/3 -> id = "3")
export default function EditarProduto() {
  const router = useRouter();
  const { id } = router.query;

  // TODO: um useState para cada campo do produto (nome, descricao, preco, quantidade)

  useEffect(() => {
    // TODO: buscar o produto (GET /produtos/:id) e preencher o formulário
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: PUT /produtos/:id com os dados atualizados
    // TODO: redirecionar para /produtos após sucesso
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: inputs controlados para nome, descricao, preco e quantidade */}
      {/* TODO: botão de submit */}
    </form>
  );
}
