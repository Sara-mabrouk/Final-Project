import NotFound404 from '../../assets/images/error.svg'

function NotFound() {
    return (
        <>
            <div className="hero min-h-screen bg-[#fff] ">
                <div className="hero-content text-center">
                    <div className="justify-center flex">
                        <img src={NotFound404} alt="NotFound" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound