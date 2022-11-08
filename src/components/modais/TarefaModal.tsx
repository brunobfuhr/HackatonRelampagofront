import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "../button/Button";
import { DivContainer, ItemsFormContainer } from "./Estilo.styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { Select } from "../select/Select";
import { Tipo } from "./TipoModal";

interface TarefaModalProps {
  closeModal: Function;
  userData?: Tarefa;
}


export type Tarefa = {
  id: number;
  data_criacao: string;
  data_vencimento: string;
  TipoId: string;
  Tipo: Tipo;
  descricao: string;
  situacao: string;
  prioridade: number;
 
};

export function TarefaModal({ closeModal, userData }: TarefaModalProps) {
  const methods = useForm<Tarefa>({
    defaultValues: {
        data_criacao: "",
        data_vencimento: "",
        TipoId: undefined,
        descricao: "",
        situacao: "",
        prioridade: undefined,
     
    },
  });

  const { handleSubmit, formState, setValue, getValues, watch } = methods;


const [tipos, setTipos] = useState(undefined);

const tipoId = watch("TipoId");

  console.log(formState);

  useEffect(() => {
    if (userData) {
      setValue("data_criacao", userData.data_criacao);
      setValue("data_vencimento", userData.data_vencimento);
      setValue("TipoId", userData.TipoId);
      setValue("descricao", userData.descricao);
      setValue("situacao", userData.situacao);
      setValue("prioridade", userData.prioridade);
      
    }
  }, [userData]);

  const { errors } = formState;

  async function handleCrateNewUser(data: Tarefa) {
    console.log("acessou");
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`http://localhost:3000/tarefas/${userData.id}`, {
            data_criacao: data.data_criacao,
            data_vencimento: data.data_vencimento,
            TipoId: data.TipoId,
            descricao: data.descricao,
            situacao: data.situacao,
            prioridade: data.prioridade,
          
        });

        toast.success("Tarefa editada com sucesso!");
      } else {
        await axios.post("http://localhost:3000/tarefas", {
            data_criacao: data.data_criacao,
            data_vencimento: data.data_vencimento,
            TipoId: data.TipoId,
            descricao: data.descricao,
            situacao: data.situacao,
            prioridade: data.prioridade,
        
        });

        toast.success("Tarefa criada");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao criar nova tarefa");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <Input label="data_criacao" id="data_criacao" errorMessage={errors.data_criacao?.message} />
          <Input label="data_vencimento" id="data_vencimento" errorMessage={errors.data_vencimento?.message} />
          <Select
            label={"Tipo"}
            id={"TipoId"}
            errorMessage={errors.TipoId?.message}
            data={tipos}
          />
          <Input label="descricao" id="descricao" errorMessage={errors.descricao?.message} />
          <Input label="situacao" id="situacao" errorMessage={errors.situacao?.message} />
          <Input label="prioridade" id="prioridade" errorMessage={errors.prioridade?.message} />

          <Button label="Criar" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}