import axios, { Axios } from "axios"
import { Probabilidad } from "../data/Tipos";

async function rellenarCampoPais(objeto:Probabilidad):Promise<Probabilidad>{
   objeto.pais = await consultarNombrePais(objeto.country_id);
   return objeto
}
async function consultarProbabilidades(nombre: string): Promise<Array<Probabilidad>>{
   const endpoint = `https://api.nationalize.io/?name=${nombre}`;
   const respuestaServidor = await axios.get(endpoint);
   const resultado = respuestaServidor.data.country;

   for(let objeto of resultado){
      objeto.pais = await consultarNombrePais(objeto.country_id)
   }
   
   /*
   resultado.forEach( async (item: ItemProps) => {
      item.pais = await consultarNombrePais(item.country_id)
   });
   */

  return resultado;
}

async function consultarNombrePais(codigo:string):Promise<string>{
   const endpoint = `https://restcountries.com/v3.1/alpha/${codigo}`
   const respuestaServidor = await axios.get(endpoint)
   return respuestaServidor.data[0].translations.spa.common
}


export { consultarProbabilidades }