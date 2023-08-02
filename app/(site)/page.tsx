import Image from 'next/image'
import './styles.scss'
import AuthForm from './components/AuthForm'

export default function Home() {
  return (
    <div className="index-container sm:px-6 lg:px-8">
      <div className='index-container--logo sm:mx-auto sm:w-full sm:max-w-md'>
        <Image
          alt='Logo'
          height='48'
          width='48'
          src='/images/logo.png'
        />
        <h2 className='index-container--title'>Sign in</h2>
      </div>
      <AuthForm />
    </div>
  )
}
