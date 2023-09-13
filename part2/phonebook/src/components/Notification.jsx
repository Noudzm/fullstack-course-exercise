const Notification = ({message}) => {
    const greennotificationStyle = {
        color: 'green',
        backgroundColor: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
    const rednotificationStyle = {
        color: 'red',
        backgroundColor: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
   
    if (message === null) {
        return null
      }
    return (
        
            <div style = {message.includes('Added') ? greennotificationStyle : rednotificationStyle}>
                {message}
            </div>
        
    )
}

export default Notification
