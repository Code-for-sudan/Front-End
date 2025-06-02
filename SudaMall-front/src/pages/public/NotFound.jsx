const NotFound = () => {
    return (
        <div className="text-center">
            404 Error page: <span className="text-blue-400">{location.pathname}</span> not Found
        </div>
    )
}

export default NotFound;