import React from 'react';

function ErrorPage() {
  return (
    <>
      <div className="d-flex h-100 text-center text-bg-light">
        <div className="mt-4 mb-5 cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">

          <main className="mt-5 mb-5 pt-5 pb-5 px-5 align-items-center">
              <p className='fw-bold text-danger fs-1'>404</p>
              <p className="fw-semibold lead text-danger fs-1">Page Not Found</p>
          </main>

        </div>
      </div>
    </>
  )
}

export default ErrorPage;