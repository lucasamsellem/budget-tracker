import PageNav from '@/components/header/PageNav'

function PageNotFound() {
  return (
    <div className='px-8 py-4'>
      <PageNav />
      <p className='m-5 text-center dark:text-white'>
        Page not found. Please click on 'Home' to be redirected to the home page.
      </p>
    </div>
  )
}

export default PageNotFound
