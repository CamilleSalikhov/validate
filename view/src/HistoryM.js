import { v4 as uuidv4 } from 'uuid';
import './HistoryM.css'


const HistoryM = ({messages}) => {

    const allMessages = messages.map(e => <div className='messageItem' key={uuidv4()}>
        {e.history}
    </div>)

    return (

        <div className='messagesContainer'>
            <p>История проверок</p>
            {allMessages}
        </div>
    )


}


export default HistoryM;