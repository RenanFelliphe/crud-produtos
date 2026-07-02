import { api } from "@/api/axiosInstance";
import { useEffect, useState } from "react";

export default function Produtos() {
  // TODO: estado para guardar a lista de produtos vinda da API

  useEffect(() => {
    // TODO: buscar os produtos (GET /produtos) ao carregar a página
  }, []);

  return (
    <>
      {/* TODO: link para a página de cadastro (/produtos/novo) */}

      {/* TODO: tabela listando os produtos (nome, preco, quantidade) */}
      {/* TODO: botão Editar -> leva para /produtos/[id] */}
      {/* TODO: botão Excluir -> chama DELETE /produtos/:id */}
    </>
  );
}
