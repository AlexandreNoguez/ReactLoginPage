import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createNewUser } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { registerNewUserSchema } from '../../yupSchema/validateForm';
import PhoneInput from 'react-phone-number-input/input'

import 'react-phone-number-input/style.css'
import "./styles.css";
import { toast } from 'react-toastify';


// console.log('yup', type(yup))
function NewRegister() {
    const [phoneValue, setPhoneValue] = useState()
    const navigate = useNavigate();
    const onSubmit = async (data) => {

        if (data.password !== data.password2) {
            toast.error('Senhas não estão idênticas, tente novamente.')
            navigate('/cadastro')
            console.log("data dentro do IF ON SUBMIT", data)
            // return console.log('Erro dentro do IF ON SUBMIT', data)
        }
        await createNewUser(data)
        navigate("/home")
        console.log('data no login', data)

    }

    const hancleCancelRegister = () => {
        navigate("/")
    }

    const onError = (error) => {
        toast.error('Confira todos os campos antes de enviar.')
        console.log('error: ', error)
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerNewUserSchema)
    })

    return (
        <div className="container">
            <div className="content">
                <h1>Preencha seus dados</h1>
                <p>e organize seus repositórios favoritos!</p>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="register-form">
                    <div className="name">
                        <label htmlFor="name">Nome *</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Ex.: Alexandre"
                            {...register("name")}
                        />
                        <span className='error-message'>
                            {errors?.name?.type && <span>{errors.name.message}</span>}
                        </span>
                        <label htmlFor="surname">Sobrenome *</label>
                        <input
                            type="text"
                            name="surname"
                            id="surname"
                            placeholder="Ex.: Noguez"
                            {...register("surname")}
                        />
                        <span className='error-message'>
                            {errors?.surname?.type && <span>{errors.surname.message}</span>}
                        </span>
                    </div>
                    <div className="email-phone">
                        <label htmlFor="email">E-mail *</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Ex.: alexandre@email.com"
                            {...register("email")}
                        />
                        <span className='error-message'>
                            {errors?.email?.type && <span>{errors.email.message}</span>}
                        </span>
                        <label htmlFor="phone">Telefone *</label>
                        <PhoneInput
                            type="tel"
                            name="phone"
                            id="phone"
                            value={phoneValue}
                            onChange={setPhoneValue}
                            placeholder="(99) 99999-9999"
                            {...register("phone")}
                        />
                        <span className='error-message'>
                            {errors?.phone?.type && <span>{errors.phone.message}</span>}
                        </span>
                    </div>

                    <div className="password">
                        <label htmlFor="password">Senha *</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Utilize no mínimo 6 caracteres"
                            {...register("password")}
                        />
                        <span className='error-message'>
                            {errors?.password?.type && <span>{errors.password.message}</span>}
                        </span>
                        <label htmlFor="password2">Repita a senha *</label>
                        <input
                            type="password"
                            name="password2"
                            id="password2"
                            placeholder="Repita sua senha"
                            {...register("password2")}
                        />
                        <span className='error-message'>
                            {errors?.password2?.type && <span>{errors.password2.message}</span>}
                        </span>
                    </div>
                    <div className='agreement-terms-box'>
                        <label
                            htmlFor="agree-terms">
                            Aceitos os <Link to="/termos"> termos </Link>
                            de uso
                        </label>
                        <input
                            type="checkbox"
                            name="agree-terms"
                            id="agree-terms"
                            {...register("terms")}
                        />
                        <span className='error-message'>
                            {errors?.terms?.type && <span>{errors.terms.message}</span>}
                        </span>
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
