import { useState } from "react";
import axios from 'axios';
import db from '../lib/db';
import model from '../model/modelo';
import Image from 'next/image';
import { useRouter } from 'next/router';

// SERVER
export async function getServerSideProps() {
  try {
    await db()
    const data = await model.find({})

    const respuesta = data.map((elemento) => {
      const res = elemento.toObject()
      res._id = res._id.toString()
      return res
    })
    return { props: { respuesta } }
  } catch (error) {
    console.log(error)
    return { props: { respuesta: [] } }
  }
}
// SERVER FINALE


export default function Home({ respuesta }) {
  const {push} = useRouter()
  const imgURL = respuesta[0].image.replace("public\\", "");
  // console.log(imgURL)
  const initial = {
    nombre: '',
    apellido: '',
    direccion: '',
    image: null
  }
  const urlDev = 'http://localhost:3000/'
  const urlPro = 'https://nextjs-upload-indol.vercel.app/'
  const [datos, setdatos] = useState(initial)

  const handleChange = (e) => {
    const { name, value } = e.target
    setdatos({ ...datos, [name]: value })
  }

  const handleFileChange = (e) => {
    setdatos({ ...datos, image: e.target.files[0] })
  }
  const hanbleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('nombre', datos.nombre);
    formData.append('apellido', datos.apellido);
    formData.append('direccion', datos.direccion);
    formData.append('image', datos.image);

    try {
      const response = await axios.post('/api/hello', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    push('/')
  }


  //   const postData = async(datos)=>{
  //     await fetch('api/hello',
  //       {
  //         method:'POST',
  //         headers:{"Content-type":"application/json"},
  //         body:JSON.stringify(datos)
  //       }
  //     )
  // }
  return (
    <div>
      <h1 className="text-center text-4xl py-8">Welcome</h1>
      <form className="flex w-[350px] mx-auto flex-col justify-center p-4 border border-slate-400" onSubmit={hanbleSubmit}>
        <p className="text-slate-500 my-2">NOMBRE</p>
        <input className="outline-none border border-slate-400" type="text" name="nombre" onChange={handleChange} />
        <p className="text-slate-500 my-2">APELLIDO</p>
        <input className="outline-none border border-slate-400" type="text" name="apellido" onChange={handleChange} />
        <p className="text-slate-500 my-2">DIRECCION</p>
        <input className="outline-none border border-slate-400" type="text" name="direccion" onChange={handleChange} />
        <p className="text-slate-500 my-2">SELECT IMAGE</p>
        <input className="outline-none border border-slate-400" type="file" name='name' onChange={handleFileChange} />
        <button className="bg-green-600 text-gray-50 p-2 text-center my-4 cursor-pointer" >SEND</button>
      </form>
      {/* RESULTADO */}
      <div className="mt-10">
        <h1 className="text-center text-2xl">RESULTADO</h1>
        {respuesta && respuesta.map((e) => {
          return (
            <div key={e._id} className="mt-10">
              <div className="w-10/12 p-4 mx-auto border border-slate-700">
                <p className="mb-5"><strong>Nombre:</strong></p>
                <p>{e.nombre}</p>
              </div>
              <div className="w-10/12 p-4 mx-auto border border-slate-700">
                <p className="mb-5"><strong>Apellido:</strong></p>
                <p>{e.apellido}</p>
              </div>
              <div className="w-10/12 p-4 mx-auto border border-slate-700">
                <p className="mb-5"><strong>Direccion:</strong></p>
                <p>{e.direccion}</p>
              </div>
              <div className="w-10/12 p-4 mx-auto border border-slate-700">
                <p className="mb-5"><strong>Fotos</strong></p>
                <Image src={urlPro+e.image.replace("public\\", "")} alt="fotos" width={120} height={120}/>
              </div>
            </div>
          )
        })

        }
      </div>
    </div>

  );
}
