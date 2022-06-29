function Alert(props){
    return (
        <div className={"txt-body bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded " + props.className} role="alert">
            <span className="block sm:inline">{props.children}</span>
        </div>
    )
}

export default Alert;