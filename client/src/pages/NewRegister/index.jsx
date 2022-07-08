import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from '../../yupSchema/validateForm'
import handleCreateNewUser from '../../contexts/auth'
import { createNewUser } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import "./styles.css";


// console.log('yup', type(yup))
function NewRegister() {
    const navigate = useNavigate();
    const onSubmit = async (data) => {

        if(data.password !== data.password2){
            alert('Senhas estão diferentes, tente novamente')
            navigate('/cadastro')
            console.log("data dentro do IF ON SUBMIT", data)
            return console.log('Erro dentro do IF ON SUBMIT')
        }
        createNewUser(data)
        navigate("/home")
        console.log('data no login', data)
        
    }
        
      const hancleCancelRegister = () => {
        navigate("/")
    }

    const { register, handleSubmit } = useForm()
    return (
        <div className="container">
            <div className="content">
                <h1>Preencha seus dados</h1>
                <p>e organize seus repositórios favoritos!</p>
                <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                    <div className="name">
                        <label htmlFor="name" id="name">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Nome"
                                {...register("name")}
                            />
                        </label>
                        <label htmlFor="surname" id="surname">
                            <input
                                type="text"
                                name="surname"
                                id="surname"
                                placeholder="Sobrenome"
                                {...register("surname")}
                            />
                        </label>
                    </div>
                    <label htmlFor="email" id="email">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                            {...register("email")}
                        />
                    </label>
                    <div className="password">
                        <label htmlFor="password" id="password">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Senha"
                                {...register("password")}
                            />
                        </label>
                        <label htmlFor="password2" id="password2">
                            <input
                                type="password"
                                name="password2"
                                id="password2"
                                placeholder="Repita sua senha"
                                {...register("password2")}
                            />
                        </label>
                    </div>
                    <div className="buttons">
                        <button className="cancel" type="submit" onClick={hancleCancelRegister}>
                            Cancelar
                        </button>
                        <button className="confirm" type="submit">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewRegister;
