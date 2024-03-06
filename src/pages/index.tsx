import { BaseLayout } from '@/components'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { t } = useTranslation()

  return (
    <BaseLayout>
      <main>
        <p>Hi, I&apos;m Tu and this is my coding assessment</p>

        <h2 className='text-xl my-4 font-bold'>This project is use:</h2>
        <h3 className='text-lg font-medium mb-2'>Frontend</h3>
        <ul className='list-disc ml-4'>
          <li>NextJS (latest but with pages router)</li>
          <li>React Hook Form</li>
          <li>Material UI</li>
          <li>TailwindCSS</li>
          <li>i18next</li>
          <li>React Toastify for notification</li>
          <li>SWR and axios for fetching API</li>
          <li>React Hook Form & zod for validation form</li>
          <li>Typescript</li>
        </ul>
        <h3 className='text-lg font-medium my-2'>Backend</h3>
        <p>I mockup with json-server which provide me a restful api server</p>
        <h3 className='my-2 text-lg font-medium'>Deploy</h3>
        <p>Deploy with vercel</p>
        <h3 className='my-2 text-lg font-medium'>Requirements:</h3>
        <ul className='list-decimal ml-4'>
          <li className='text-green-600'>In Add employee page create a form to add employee details. (Done)</li>
          <li className='text-green-600'>In Edit employee we can change data of any employee. (Done)</li>
          <li className='text-green-600'>
            View employee page will contain list of all employees which I can edit or delete. (Done)
          </li>
          <li className='text-green-600'>View employee page will show the profile image in Avatar (Done)</li>
          <li className='text-green-600'>employee details will be (name, salary, age, profile image). (Done)</li>
          <li className='text-green-600'>
            In edit employee tab for salary input, only allows positive number without decimal (Done)
          </li>
          <li className='text-green-600'>In edit employee tab, able to upload profile image (Done)</li>
          <li className='text-green-600'>
            In any tab, if we reload page then it will open same tab instead of going to first tab. (Done)
          </li>
        </ul>
        <h3 className='my-2 text-lg font-medium'>References:</h3>
        <ul className='list-disc ml-4'>
          <li>
            <a
              className='text-blue-500 hover:underline'
              href='https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md'
            >
              Project Structure
            </a>
          </li>
          <li>
            <a
              className='text-blue-500 hover:underline'
              href='https://www.patterns.dev/react/presentational-container-pattern'
            >
              Container/Presentational Pattern
            </a>
          </li>
          <li>
            <a className='text-blue-500 hover:underline' href='https://www.patterns.dev/react/render-props-pattern'>
              Render Props Pattern
            </a>
          </li>
          <li>
            <a
              className='text-blue-500 hover:underline'
              href='https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#wrappingmirroring'
            >
              Wrapping/Mirroring Pattern
            </a>
          </li>
        </ul>
      </main>
    </BaseLayout>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}
