import React from 'react'

const HomePageChat = () => {
    return (
        <div className='container homepage-chat mt-5'>
            <div className='row'>
                <div className='col-md-6 col-lg-6 col-sm-12 col-xs-12 d-flex flex-column align-items-start justify-content-center gap-5'>
                    <div>
                        <h1 className='display-4 fw-bold'>Chat with your Mitra!</h1>
                        <div className='fs-5 lead'>Start talking to your Mitra. He will never judge you whatever the way you speak. He will be your best friend preparing you to speak with confidence. Just chat with your bot..!</div>
                        {/* <div className='fs-5'>He will be your best friend preparing you to speak with confidence</div> */}
                    </div>
                    <button className='btn btn-outline-primary d-flex gap-2 align-items-center btn-lg'>
                        <span>Get Started</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                    </button>
                </div>
                <div className='d-none d-md-block col-md-6 col-lg-6'>
                    <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--E5VhGR2w--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/eu5qnbj3326gpaalps6y.gif" className='img-fluid' />
                </div>
            </div>

        </div>
    )
}

export default HomePageChat