import BaseLayout from '@/components/layouts/BaseLayout'
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
          <li>React Query and axios for fetching API</li>
          <li>React Hook Form & yup for validation form</li>
          <li>Typescript</li>
        </ul>
        <h3 className='text-lg font-medium my-2'>Backend</h3>
        <p>I mockup with json-server which provide me a restful api server</p>
        <h3 className='my-2 text-lg font-medium'>Deploy</h3>
        <p>Deploy with vercel</p>
        <h3 className='my-2 text-lg font-medium'>Requirement</h3>
        <ul className='list-decimal ml-4'>
          <li className='text-green-600'>In Add employee page create a from to add employee details. (Done)</li>
          <li className='text-green-600'>In Edit employee we can change data of any employee. (Done)</li>
          <li className='text-green-600'>View employee page will contain list of all employees which I can edit or delete. (Done)</li>
          <li className='text-green-600'>View employee page will show the profile image in Avatar (Done)</li>
          <li className='text-green-600'>employee details will be (name, salary, age, profile image). (Done)</li>
          <li className='text-green-600'>In edit employee tab for salary input, only allows positive number without decimal (Done)</li>
          <li className='text-green-600'>In edit employee tab, able to upload profile image (Done)</li>
          <li className='text-green-600'>In any tab, if we reload page then it will open same tab instead of going to first tab. (Done)</li>
          <li className='text-red-600'>In view employee tab, to show truncated name if name character length is more than 25.</li>
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
