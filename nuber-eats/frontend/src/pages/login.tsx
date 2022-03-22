import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { FormError } from '../components/form-error'
import { Button } from '../components/button'
import { LOCAL_STORAGE_TOKEN } from '../constants'
import { authTokenVar, isLoggedInVar } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: 'onChange'
  })

  const onCompleted = (data: any) => {
    const {
      login: { ok, token }
    } = data

    if (ok && token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token)
      authTokenVar(token);
      isLoggedInVar(true);
    }
  }

  const [loginMutation, { data, loading }] = useMutation(LOGIN_MUTATION, { onCompleted })

  const onSubmit = () => {
    if (loading) return

    const { email, password } = getValues()

    loginMutation({
      variables: {
        loginInput: {
          email,
          password,
        }
      }
    })
  }

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h3 className="font-medium text-3xl mb-10">Nuber Eats</h3>
        <h4 className='w-full font-medium text-left text-3xl mb-5'>Welcome back</h4>
        <form
          className="grid gap-5 mt-5 w-full mb-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="input"
            type="email"
            placeholder="Email"
            required
            {...register('email', {
              required: 'Email is required',
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            className="input"
            type="password"
            placeholder="Password"
            required
            {...register('password', { required: 'Password is required', minLength: 5 })}
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 5 characters" />
          )}
          <Button
            canClick={isValid}
            loading={loading}
            actionText="Login"
          />
          {data?.login.error && (
            <FormError errorMessage={data?.login.error} />
          )}
        </form>
        <div>
          New to Nuber?{' '}
          <Link to="/create-account" className="text-lime-600 hover:underline">Create an Account</Link>
        </div>
      </div>
    </div>
  )
}