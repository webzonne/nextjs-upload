import mongoose from "mongoose";
mongoose.set('strictQuery', false);
const MONGODB_URL= 'mongodb+srv://test:test@cluster0.nlcuchu.mongodb.net/?retryWrites=true&w=majority'

const conectarDB = async() =>{
    try{
        
        await mongoose.connect(MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('mongodb conectado')
    }catch(error) {
        console.log(error)
        process.exit(1)
    }
}

export default conectarDB