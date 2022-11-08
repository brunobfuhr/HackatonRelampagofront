import styles from "./Card.module.css";
import { CardInfo } from "../CardInfo";
import axios from "axios";
import { ContentContainer, DivContainer, Edit, Remove } from "../Cards.styles";
import { AppWindow, Pencil, Trash } from "phosphor-react";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Tarefa, TarefaModal } from "../modais/TarefaModal";



interface CardProps {
  data: Tarefa;
}



export function Card({ data }: CardProps) {
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Editar Tarefa</strong>,
      html: <TarefaModal closeModal={MySwal.close} userData={data} />,
      showConfirmButton: false,
    }).then(() => window.location.reload());
  };


  const fDelete = async (id:any) => {
    if (!confirm('Confirma a exclusão?'))
    {
     return;
    }
     axios.delete(`http://localhost:3000/tarefas/` + data.id)
         .then((response) => {
             Swal.fire(`Tarefa ${data.id} deletada`);
         }, (error) => {
             Swal.fire(`Erro ao deletar tarefa: ${error.response.data.error} `);
         });
 };


  return (
    <DivContainer>
      <ContentContainer>
        <strong>{data.id}</strong>

        <CardInfo title="Data de criação" data={data.data_criacao} />
        <CardInfo title="Data de vencimento" data={data.data_vencimento} />
        <CardInfo title="Tipo" data={data.Tipo.descricao} />
        <CardInfo title="Descrição" data={data.descricao} />
        <CardInfo title="Situação" data={data.situacao} />
        <CardInfo title="Prioridade" data={data.prioridade} />
      

        <Edit title="Editar" onClick={showSwal}>
          {<Pencil size={32} />}
        </Edit>
        <Remove title="Excluir" onClick={fDelete} >
          {<Trash size={32} />}
        </Remove>
      </ContentContainer>
    </DivContainer>
  );
}