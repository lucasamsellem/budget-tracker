import PageNav from '@/components/header/PageNav'

function PageNotFound() {
  return (
    <>
      <PageNav />
      <p className='m-5 text-center'>
        Page not found. Please click on 'Home' to be redirected to the home page.
      </p>
    </>
  )
}

export default PageNotFound
