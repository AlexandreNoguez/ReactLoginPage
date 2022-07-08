import * as yup from "yup";
import { phoneNumber } from "../utils/validations";

export const registerSchema = yup.object({
    name: yup.string().required("E-mail é um campo obrigatório"),
    surname: yup.string().required("E-mail é um campo obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail é um campo obrigatório"),
    password: yup.string().min(3, "A senha deve conter no mínimo 6 carateres").required("Senha é obrigatória"),
    phone: yup.string().matches(phoneNumber).required("Seu número de contato é obrigatório"),
});
 