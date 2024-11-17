import Image from 'next/image'
import Link from 'next/link'
import UploadImage from '../../components/uploadimage'

export default function Home() {
  return (
    <>
      <div className='h-56 flex items-center justify-center'>
      <Image
          src={"/logo.png"}
          width={400}
          height={400} alt={'logo.png'}
          />
      </div>

      <div className='text-center'>
        <UploadImage/>
      </div>

      <div className='flex justify-start w-82 mt-20 md:ml-10 mx-5 md:mt-2 pb-28'>
        <Image
          src={"/example-2.png"}
          width={480}
          height={480} alt={'image of fred again actual life albums'} />
      </div>

      <footer className='text-center justify-center text-white text-sm pb-10 '>
        <p className='pb-3'>
          Made by <Link href="https://coleridge.dev" className='font-bold'>@kaicoleridge</Link> in the 🇬🇧
        </p>
        <div className='flex items-center justify-center px-5'>
        </div>
       
        <div className='space-x-6'>
        <Link href={'/privacy'} className='text-gray-500 font-medium'>Privacy</Link>
        <Link href={'https://buy.stripe.com/3cs4iTa1I7MOdeUcMO'} target='_blank' className='text-gray-500 font-medium'>Support me</Link>
        </div>
       
       </footer>
    </>
  )
}
