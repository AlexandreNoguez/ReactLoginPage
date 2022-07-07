import * as yup from "yup";

export const registerSchema = yup.object().shape({
    email: yup
        .string()
        .email("E-mail inválido")
        .required("E-mail é um campo obrigatório"),
    password: yup
        .string()
        .min(3, "A senha deve conter no mínimo 6 carateres")
        .required("Senha é obrigatória"),
});
