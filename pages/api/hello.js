import db from '../../lib/db';
import modelo from '../../model/modelo';
import multer from 'multer';

// const upload = multer({ dest: './public/uploads' });

const upload = multer({
  storage:multer.diskStorage({
    destination:'./public/uploads',
    filename:(req, file, cb)=>cb(null, file.originalname)
  })
})

export default async function server(req,res){
  await db()
  const {method} = req

  switch(method){
    case 'POST':
      try {
        await new Promise((resolve, reject) => {
          upload.single('image')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              return reject({ error: 'Error uploading file.' });
            } else if (err) {
              return reject({ error: err });
            }
            resolve();
          });
        });
        const { nombre, apellido, direccion } = req.body;
        console.log(nombre)
        const image = req.file ? req.file.path : '';
        const data = new modelo({
          nombre,
          apellido,
          direccion,
          image
        });
        // console.log(req.body)
        // const data = new modelo(req.body)
        await data.save();
        return res.status(200).json({ mensaje: 'dato guardado exitosamente' });
      } catch (error) {
        return res.status(400).json({ error });
      }
    default:
      return res.status(500).json({ mensaje: 'falla en el servidor' });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
