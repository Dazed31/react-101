const User = (props) => {

    const handleClick = () => {
        alert(`Hello ${props.name}`)
    }

    return (
        <h1 onClick={handleClick}>{props.name}</h1>
    )
}

export default User;