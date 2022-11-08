import { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "../button/Button";
import { DivContainer, ItemsFormContainer } from "./Estilo.styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";


interface TipoModalProps {
  closeModal: Function;
  userData?: Tipo;
}


export type Tipo = {
  id: number;
  descricao: string;

 
};

export function TipoModal({ closeModal, userData }: TipoModalProps) {
  const methods = useForm<Tipo>({
    defaultValues: {
        descricao: "",
       
     
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  console.log(formState);

  useEffect(() => {
    if (userData) {
      setValue("descricao", userData.descricao);

      
    }
  }, [userData]);

  const { errors } = formState;

  async function handleCrateNewUser(data: Tipo) {
    console.log("acessou");
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`http://localhost:3000/tipos/${userData.id}`, {
            descricao: data.descricao,
            
          
        });

        toast.success("Tipo editado com sucesso!");
      } else {
        await axios.post("http://localhost:3000/tipos", {
            descricao: data.descricao,
           
        
        });

        toast.success("Tipo criado");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao criar novo tipo");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <Input label="descricao" id="descricao" errorMessage={errors.descricao?.message} />
          

          <Button label="Criar" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}