import mongoose from "mongoose";

const imageShema = new mongoose.Schema({
    nombre:{
        type:String,
        //required:[true, "por favor ingresar nombre"]
    },
    apellido:{
        type:String,
        //required:[true, "por favor ingresar nombre"]
    },
    direccion:{
        type:String,
        //required:[true, "por favor ingresar nombre"]
    },
    image:{
        type:String,
        //required:[true, "por favor ingresar nombre"]
    },
  

})

export default mongoose.models.images || mongoose.model('images', imageShema)