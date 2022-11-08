import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TelaTarefas } from "../pages/telaTarefas";





export function Router() {
  
  return (
    <Routes>
      
        <Route path="/" element={<TelaTarefas />} />
       
     
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}


