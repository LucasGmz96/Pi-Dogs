import NavBar from "../../component/NavBar/NavBar"
import  {useSelector, useDispatch} from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import styled from "./Form.module.css"
import {getTemperament} from "../../Redux/Actions"

// expreciones regulares

const rejex = /\d/
const rejexImage = /.*(png|jpg|jpeg|gif)$/;
const validate = (form)=>{
    let error = {}

 


    if (rejex.test(form.name) || form.name.length > 20){
        error.name = "The name must be less than 20 characters and cannot contain numbers."
    }
    else if ( form.weight > 50 ){
        error.weight = "The weight cannot be more than 50kg"
    }
    else  if ( form.height > 100 ){
        error.height = "The height cannot be more than 100cm"
    }
     else if ( form.life_span > 30 ){
        error.life_span = "The life span cannot be more than 30 years"
    }
     else if ( !rejexImage.test(form.image) && !form.image.length == 0){
        error.image = "Wrong URL, default image will be placed"
    }   
    return error
    }





const Form = ()=>{
    const dispatch = useDispatch()

    const temperamentsAll = useSelector(state => state.temperaments)

    const initialChBox = new Array(124).fill(false)

    const [chBox, setChBox] = useState(initialChBox)




    useEffect(() => {
        dispatch(getTemperament())
    }
        ,[])

    


    const[form,setForm] = useState({
        name:'',
        weight:'',
        height:'',
        life_span:'',
        image: '',
        temperament: [],
    })
    const[errors,setErrors] = useState({
        name:'',
        weight:'',
        height:'',
        life_span:'',
        image:'',
    })


    if(form.temperament.length > 2) console.log('hola')

   

    const  handleChange = (e)=>{
        const property = e.target.name // cual input se va a cambiar
        const value = e.target.value    // valor del input que se cambio
        setForm({
          ...form,
            [property]:value
        })
        const err = validate({
            ...form,
              [property]:value
          })
          setErrors(err)
          
    }

    const handleCheckBox = (e, position)=>{
        const cheClick = chBox.map((t,i)=> i === position? !t : t);
        if (chBox[position]){
                setChBox(cheClick);
                const deleteTemp = form.temperament.filter((t)=> t !== e.target.value);
                setForm({...form, temperament: deleteTemp });

                return;
        }
        setChBox(cheClick)
        setForm({...form, temperament: [...form.temperament, e.target?.value]  })
       


}


  
    
    
    const submitHandler = (event) => {
        event.preventDefault()

        if(Object.keys(errors).length === 0){
            return (
        axios.post("http://localhost:3001/dogs",form)
            .then(res=>alert(res.data))
            .catch(err=>alert(err))
        )}
        else{alert('Campos requeridos son incorrectos')}
            }


         


    return (
        <div>
                <NavBar/>
                <form onSubmit={submitHandler} className={styled.padre}>
            <div className={styled.contenedor}>
                <div className={styled.contenedorTxt}>

                    <div className={styled.grupoTxt}>
                    
                    <div className={styled.conteiner_input_label}>
                        <label className={styled.label}>Name: </label>
                            <input type= "text" value={form.name} onChange={handleChange} name='name' className={styled.input} placeholder='Name...' required/>
                            <span>{errors.name}</span>
                    </div>
                    <div className={styled.conteiner_input_label}>
                        <label className={styled.label}>Weight: </label>
                        <input type= "number" value={form.weight} onChange={handleChange} name='weight' className={styled.input} placeholder='indicate weight...' required />
                        <span>{errors.weight}</span>
                    </div>
                    <div className={styled.conteiner_input_label}>
                        <label className={styled.label}>Height: </label>
                        <input type= "number" value={form.height} onChange={handleChange} name='height' className={styled.input} placeholder='indicate height...' required />
                        <span>{errors.height}</span>
                    </div>
                    <div className={styled.conteiner_input_label}>
                        <label className={styled.label}>Life span: </label>
                        <input type= "number" value={form.life_span} onChange={handleChange} name='life_span' className={styled.input} placeholder='indicate life span...' required />
                        <span>{errors.life_span}</span>
                    </div>
                    <div className={styled.conteiner_input_label}>
                        <label className={styled.label}>Image: </label>
                        <input type= "text" value={form.image} onChange={handleChange} name='image' className={styled.input}placeholder='URL...' required />
                        <span>{errors.image}</span>
                    </div>
                    </div>

                    <div>
                        <p>Temperament: </p>
                        <div className={styled.temperament}>
                        
                        {temperamentsAll.map((t,i) => (
                            <label  key={i} >
                                <input type="checkbox" name="temperament" value={t.name} onChange={(e)=>handleCheckBox(e,i)}  />{t.name}
                                
                            </label>
                        ))}
                    
                        </div>   
                         <span>{errors.temperament}</span>
                    </div>

                            



                </div>
                    <div className={styled.containerButton}>
                    {form.temperament.length >= 7 && <p> temperaments must be greater than 1 and less than 6 </p>}
                    {(form.temperament.length >= 1 && form.temperament.length <= 6) && <button type="submit">Create</button> }
                    </div>
                </div>
                </form>

        </div>
    )
}
export default Form;