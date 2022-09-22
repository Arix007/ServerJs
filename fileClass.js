const {promises:fs} = require ('fs')

class Contenedor {

    constructor (ruta){
        this.ruta=ruta
    }

    async productos () {
        try {
            const objetos= await fs.readFile(this.ruta, 'utf-8');            
            return JSON.parse(objetos)           

        } catch (error) {
            return []
        }
    }

    async save (newObject) {

        const objetos = await this.productos()

        let newId
        if (objetos.length == 0) {
            newId=1
        } else {
            const ultimoId= objetos[objetos.length - 1]
            newId=ultimoId.id +1;
        }

        objetos.push({...newObject, id:newId})

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2))
            return newId;
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
        
    }

    async getById (id) {
        const objetos = await this.productos()
        const newObjet = objetos.filter( elemento => elemento.id==id)
        try {                       
            console.log(newObjet)                      

        } catch (error) {
            return []
        }
        
    }

    async getAll () {
        try {
            const objetos= await fs.readFile(this.ruta, 'utf-8');
            console.log(objetos)                       

        } catch (error) {
            return []
        }
    }

    async deleteById (id) {
        const objetos = await this.productos()
        const nuevoObjeto = objetos.filter( elemento => elemento.id!==id)

        if(nuevoObjeto.length === objetos.length){
            throw new Error(`Error al borrar: no se encontro al id ${id}`)
        }
        try {
            await fs.writeFile(this.ruta, JSON.stringify(nuevoObjeto, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll () {
        const objetos = await this.productos()
        const nuevoObjeto = []
        if(objetos.length === nuevoObjeto.length){
            throw new Error(`Error al borrar: archivo vacio`)
        }
        try {
            await fs.writeFile(this.ruta , nuevoObjeto)
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async productRandom(){
        const objetos = await this.productos()
        const r = objetos.length        
        let random = Math.floor(Math.random() * r)
        return objetos[random]

    }

}

//const listaP= new Contenedor('./productos.txt')

module.exports = Contenedor

//listaP.save({title:'Aceite', price:'50', thumbnail:'url'})
//listaP.deleteById(1)
//listaP.getAll()
//listaP.getById(3)
//listaP.deleteAll()