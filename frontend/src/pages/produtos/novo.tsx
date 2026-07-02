import { api } from "@/api/axiosInstance";
import { useState } from "react";

export default function NovoProduto() {
  // TODO: um useState para cada campo do produto (nome, descricao, preco, quantidade)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST /produtos com os dados do formulário
    // TODO: redirecionar para /produtos após sucesso (useRouter)
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: inputs controlados para nome, descricao, preco e quantidade */}
      {/* TODO: botão de submit */}
    </form>
  );
}
