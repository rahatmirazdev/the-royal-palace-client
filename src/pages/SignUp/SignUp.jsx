import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useState } from 'react'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const [passwordError, setPasswordError] = useState('')

  const validatePassword = (password) => {
    // Check if password contains at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(password)
    // Check if password contains at least one lowercase letter
    const hasLowercase = /[a-z]/.test(password)
    // Check if password is at least 6 characters long
    const isLongEnough = password.length >= 6

    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!hasLowercase) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!isLongEnough) {
      return 'Password must be at least 6 characters long'
    }
    return ''
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value

    // Validate password
    const passwordValidationError = validatePassword(password)
    if (passwordValidationError) {
      setPasswordError(passwordValidationError)
      toast.error(passwordValidationError)
      return
    }

    setPasswordError('')

    const image = form.image.files[0]
    const formData = new FormData()
    formData.append('image', image)

    try {
      const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
      const imageUrl = data.data.display_url

      const result = await createUser(email, password)
      await updateUserProfile(
        name,
        imageUrl
      )
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      toast.error(err?.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      toast.error(err?.message)
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10  bg-white text-gray-900 border border-blue-500'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                required
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900 ${passwordError ? 'border-red-500' : ''}`}
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.
              </p>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-blue-500 w-full rounded-md py-3 text-white'
            >Continue
            </button>
          </div>
        </form>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border my-3 p-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-100'
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-blue-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
