import './common.css';

function Card(props) {

    const formattedTime = (date) => {
       return new Date(date).toLocaleTimeString().slice(0,4) + ' ' +  new Date(date).toLocaleTimeString().slice(-2)
    }

    const updateList = () => {
            props.onAdd({...props.data, action: props.button})
    }
    return (<>
        <div className="cardWrap">
            <div className="title"> <p>{props.data.event_name.slice(0,1)}</p></div>
            <div className="details">
                <div className="info">
                    <div className="style"><p>{props.data.event_name}</p></div>
                    <div className="category"><p>{props.data.event_category}</p></div>
                    <div className="timing"><p>{formattedTime(props.data.start_time)}</p> - <p>{formattedTime(props.data.end_time)}</p>  </div>
                </div>
                <div className={`selectButton ${props.button === 'REMOVE' && 'red'}`} onClick={updateList}> <p>{props.button}</p></div>
            </div>
        </div>
    </>);
}

export default Card;