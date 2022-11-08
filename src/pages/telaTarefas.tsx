import { Header } from "../components/Header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Pencil } from "phosphor-react";
import { Menu } from "../components/Menu";
import { MainContainer } from "./telaTarefas.styles";
import { Button } from "../components/button/Button";
import { Card } from "../components/CardTarefa/Card";
import { TarefaModal, Tarefa } from "../components/modais/TarefaModal";


export function TelaTarefas() {
  const MySwal = withReactContent(Swal);
  const [userList, setUserList] = useState<Tarefa[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Tarefa[]>("http://localhost:3000/tarefas").then((response) => {
      setUserList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Cadastrar Tarefa</strong>,
      html: <TarefaModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };


  const gerarPdf = () => {
    window.location.href="http://localhost:3000/tarefas/pdf";
      }
    
  

  return (
    <div>
      <Header label="Gestão de tarefas" />
      
      <MainContainer>
        <Button label="Criar" width={82} height={50} onClick={showSwal} />
        {userList.map((tarefa) => {
          return <Card data={tarefa} />;
        })}
        <Button label="Gerar Pdf"  width={90} height={40} onClick={gerarPdf} />
       
      </MainContainer>
    </div>
  );
}