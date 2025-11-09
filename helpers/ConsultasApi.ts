import axios from "axios"
import { Probabilidad } from "../data/Tipos";
import { consultarProbabilidadOffline, guardarProbabilidad } from "./ConsultarAlmacenamientoInterno";
import { existeNombre } from "./ConsultaAlmacenamiento";

async function rellenarCampoPais(objeto:Probabilidad):Promise<Probabilidad>{
   objeto.pais = await consultarNombrePais(objeto.country_id);
   return objeto
}
async function consultarProbabilidadesApi(nombre: string): Promise<Array<Probabilidad>>{
   const endpoint = `https://api.nationalize.io/?name=${nombre}`;
   const respuestaServidor = await axios.get(endpoint);
   const resultado = respuestaServidor.data.country;

   for(let objeto of resultado){
      objeto.pais = await consultarNombrePais(objeto.country_id)
   }
   
   await guardarProbabilidad(nombre, resultado)
   return resultado;  
}

async function consultarProbabilidades(nombre:string, online:boolean, usarCache:boolean){
   let resultado = []
   if(online) {
      if(usarCache){

         const existe = await existeNombre(nombre)

         if(existe){

            resultado = await consultarProbabilidadOffline(nombre)
         }else{

            resultado = await consultarProbabilidadesApi(nombre)
         }
      }else {

         resultado = await consultarProbabilidadesApi(nombre)
      }
   } else{

      resultado = await consultarProbabilidadOffline(nombre)
   }
   return resultado

}

async function consultarNombrePais(codigo:string):Promise<string>{
   const endpoint = `https://restcountries.com/v3.1/alpha/${codigo}`
   const respuestaServidor = await axios.get(endpoint)
   return respuestaServidor.data[0].translations.spa.common
}


export { consultarProbabilidadesApi, consultarProbabilidades }