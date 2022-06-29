function NotFound() {
    return (
        <div className="pt-[calc(6vh+80px)] md:pt-[4vh] 
                        flex flex-col items-center 
                        max-h-[calc(100vh-80px)] 
                        text-center 
                        overflow-hidden">
            <div className="animate-slideIn flex flex-col txt-title">
                <h1>Error 404</h1>
                <h1>Page Not Found</h1>
            </div>
            <img alt='' src='./images/error_404_image.png' className="h-[calc(60vh-80px)] fixed bottom-0 -z-10 object-cover"/>
        </div>
    )
}

export default NotFound;