'use client'
import './styles.scss'
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import Input from '@/app/components/inputs/Input'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [loading, setLoading] = useState(false)

    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN') setVariant('REGISTER')
        if(variant === 'REGISTER') setVariant('LOGIN')
    }, [variant])
    
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = data => {
        setLoading(true)

        if(variant === 'LOGIN') console.log('axios login')
        if(variant === 'REGISTER') console.log('axios register')
    }

    const socialAction = (action:string) => {
        setLoading(true)
    }

    return (
        <div className="form-container sm:mx-auto sm:w-full sm:max-w-md">
            <div className="form-container--card shadow sm:rounded-lg sm:px-10">
                <form 
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        disabled={loading}
                        register={register}
                        errors={errors}
                        required
                        id="name" 
                        label="Name"
                    />
                </form>
            </div>
        </div>
    )
}

export default AuthForm