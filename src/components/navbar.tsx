import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header>
      <nav className='px-10 py-6 border-b border-charcoal-gray flex justify-between'>
        <Link href={'/'} className='flex items-center gap-2'>
          <Image src='/logo-small.svg' alt='logo image upload' height={30} width={30} />
          <h1 className='font-semibold text-soft-white'>ImageUpload</h1>
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
