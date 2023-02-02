import Card from './Card';
import './common.css'

function SelectedEvents(props) {
    
    const allCards = () => {
        
        var namesList = props.data.map(function(_, i){
                        return  <Card data = {props.data[i]? props.data[i] : [] }  onAdd = {props.onAdd} button = {props.button}/>;
                      })

        return  namesList
    }
    return (<div className="wrapper">
        <div className='header'>
            <h1>Selected Events</h1>
        </div>
        <div className='cardsWrap'>
        {allCards()}
        </div>
    </div>);
   
}

export default SelectedEvents;