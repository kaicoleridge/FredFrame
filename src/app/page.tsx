import Image from 'next/image'
import Link from 'next/link'
import UploadImage from '../../components/uploadimage'

export default function Home() {
  return (
    <>
      <div className='h-64 flex items-center justify-center'>
        <Link href={"/"}>
        <Image
          src={"/logo.png"}
          width={350}
          height={350} alt={'logo'} />
          </Link>
      </div>

      <div className='text-center'>
        <UploadImage/>
      </div>

      <div className='flex justify-start w-82 mt-20 md:ml-10 mx-5 md:mt-2 pb-28'>
        <Image
          src={"/example.png"}
          width={480}
          height={480} alt={'image of fred again actual life albums'} />
      </div>

      <footer className='text-center justify-center text-white text-sm pb-10 '>
        <p className='pb-3'>
          Made by <Link href="https://coleridge.dev" className='font-bold'>@kaicoleridge</Link> in the 🇬🇧
        </p>
        This app has <b>no affiliation </b>with <Link href="https://www.instagram.com/fredagainagainagainagainagain/?hl=en" className='font-bold'>Fred Again.</Link>
        <div className='flex items-center justify-center mt-5 px-5'>
        </div>
      
       </footer>
    </>
  )
}
