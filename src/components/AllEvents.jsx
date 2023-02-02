import Card from './Card';
import './common.css'

function AllEvents(props) {

    const allCards = () => {
        var CardList = props.data.map(function (_, i) {
            return <Card data={props.data[i] ? props.data[i] : []} onAdd={props.onAdd} button={props.button} />;
        })
        return CardList
    }
    return (<div className="wrapper">
        <div className='header'>
            <h1>All Events</h1>
        </div>
        <div className={`cardsWrap ${props.data.length < 8 && 'prevent-click'}`}>
            {allCards()}
        </div>
    </div>);

}

export default AllEvents;