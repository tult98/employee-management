import FlagIcon from '@/components/FlagIcon'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SelectLanguage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleLanguageChange = (language: string) => {
    setIsOpen(false)
    router.push(router.asPath, undefined, { locale: language })
  }

  return (
    <div className='absolute top-4 right-4 min-w-[150px]'>
      <button
        onClick={onToggle}
        type='button'
        className='inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
      >
        <FlagIcon countryCode={router.locale ?? 'vi'} />
        {router.locale === 'vi' ? 'Tiếng Việt' : 'English'}
        <svg
          className='-me-1 ms-2 h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className='origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'
          role='menu'
          aria-orientation='vertical'
        >
          <div className='py-1 grid grid-cols-1' role='none'>
            {['vi', 'en'].map((language, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleLanguageChange(language)}
                  className={`${'text-gray-700'} block px-4 py-2 text-sm text-start items-center hover:bg-gray-100 ${
                    index % 2 === 0 ? 'rounded-r' : 'rounded-l'
                  }`}
                  role='menuitem'
                >
                  <FlagIcon countryCode={language} />
                  <span className='truncate'>{language === 'vi' ? 'Tiếng việt' : 'English'}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectLanguage
