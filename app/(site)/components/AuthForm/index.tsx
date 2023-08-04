'use client'
import './styles.scss'
import { useCallback, useState } from "react"
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import Input from '@/app/components/inputs/Input'
import Button from '@/app/components/Button'
import AuthSocialButton from '../AuthSocialButton'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

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

        if(variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then(callback => {
                if(callback?.error) {
                    toast.error('Invalid credentials')
                }
                if(callback?.ok && !callback?.error) {
                    toast.success('Logged in!')
                }
            })
            .finally(() => setLoading(false))
        }

        if(variant === 'REGISTER') {
            axios.post('/api/register', data)
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setLoading(false))
        }
    }

    const socialAction = (action:string) => {
        setLoading(true)

        signIn(action, { redirect: false })
        .then(callback => {
            if(callback?.error) {
                toast.error('Invalid credentials')
            }
            if(callback?.ok && !callback?.error) {
                toast.success('Logged in!')
            }
        })
        .finally(() => setLoading(false))
    }

    return (
        <div className="form-container sm:mx-auto sm:w-full sm:max-w-md">
            <div className="form-container--card shadow sm:rounded-lg sm:px-10">
                <form 
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input
                            disabled={loading}
                            register={register}
                            errors={errors}
                            required
                            id="name" 
                            label="Name"
                        />
                    )}
                    <Input 
                        disabled={loading}
                        register={register}
                        errors={errors}
                        required
                        id="email" 
                        label="Email address" 
                        type="email"
                    />
                    <Input 
                        disabled={loading}
                        register={register}
                        errors={errors}
                        required
                        id="password" 
                        label="Password" 
                        type="password"
                    />
                    <div>
                        <Button disabled={loading} fullWidth type="submit">
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="form-container--divisor">
                            <div className="form-container--line" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton 
                            icon={BsGithub} 
                            onClick={() => socialAction('github')} 
                        />
                        <AuthSocialButton 
                            icon={BsGoogle} 
                            onClick={() => socialAction('google')} 
                        />
                    </div>
                </div>

                <div className="form-container--footer">
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'} 
                    </div>
                    <div 
                        onClick={toggleVariant} 
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AuthForm