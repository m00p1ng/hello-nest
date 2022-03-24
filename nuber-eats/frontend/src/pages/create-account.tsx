import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { FormError } from '../components/form-error'
import { Button } from '../components/button'

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`

export enum UserRole {
  Client = 'Client',
  Delivery = 'Delivery',
  Owner = 'Owner'
}

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client
    }
  })

  const navigate = useNavigate()

  const onCompleted = (data: any) => {
    const { createAccount: { ok } } = data
    if (ok) {
      alert('log in please')
      navigate('/')
    }
  }

  const [createAccountMutation, { data, loading }] = useMutation(CREATE_ACCOUNT_MUTATION, { onCompleted })

  const onSubmit = () => {
    if (loading) return

    const { email, password, role } = getValues()

    createAccountMutation({
      variables: {
        createAccountInput: {
          email,
          password,
          role
        }
      }
    })
  }

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h3 className="font-medium text-3xl mb-10">Nuber Eats</h3>
        <h4 className='w-full font-medium text-left text-3xl mb-5'>Let's get started</h4>
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
          <select
            className="input"
            {...register('role', { required: true })}
          >
            {Object.keys(UserRole).map(role => (
              <option key={role}>{role}</option>
            ))}
          </select>
          <Button
            canClick={isValid}
            loading={loading}
            actionText="Create Account"
          />
          {data?.createAccount.error && (
            <FormError errorMessage={data?.createAccount.error} />
          )}
        </form>
        <div>
          Already have and account?{' '}
          <Link to="/" className="text-lime-600 hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  )
}