import * as yup from "yup";
import { phoneNumber } from "../utils/validations";

export const registerNewUserSchema = yup.object().shape({
    name: yup.string().required("Nome é um campo obrigatório"),
    surname: yup.string().required("Sobrenome é um campo obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail é um campo obrigatório"),
    password: yup.string().min(6, "A senha deve conter no mínimo 6 carateres").required("Senha é obrigatória"),
    terms: yup.bool().oneOf([true], "Você deve aceitar os termos de uso").required(),
    // phone: yup.string().matches(phoneNumber)
    // .required("Seu número para contato é obrigatório"),
}).required();
