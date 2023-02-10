import './App.css';
import HistoryM from './HistoryM'; 
import { useState, useEffect } from 'react';

function App() {

  const [textValue, setTextValue] = useState('');
  const [resultString, setResultString] = useState('');
  const [messages, setMessages] = useState([]);
  const [firstSubmit, setFirstSubmit] =useState(0);
  const [languageM, setLanguageM] = useState('')

  const handleChange = (e) => {
    setTextValue(e.target.value);
     ;    
  }

  useEffect(() => {
    setTimeout(() => {
      handleGet(); 
    }, "1000")
     
  }, [firstSubmit])



  useEffect(() => {
    if (firstSubmit != 0) {
      handleFetch('validate')
    }
     
  }, [textValue,firstSubmit])



  const handleBold = (code, bold, original) => {
     
    
        let result = '';
        for (let i = 0; i < code.length; i++) {
          if (code[i] === bold) {
            result += '<b>' + `${original[i]}` + '</b>' 
            console.log(result)
          } else {
            result += original[i]
          }
          
        }

        console.log(result);
        return result ;

  }


  const handleGet = () => {

    fetch("http://validate.com/validate", {
        method: 'GET',
        header: {
             'Content-Type': 'application/json' 
        }  
    }).then(r => r.json())
    .then(r => setMessages(r))

  }




  const handleFetch = (type) => {
    const result = textValue.split('');
    console.log(JSON.stringify(result));

    fetch("http://validate.com/validate", {
        method: 'POST',
        header: {
             'Content-Type': 'application/json' 
        },
        body : JSON.stringify({
          value : result,
          type:type
        })

    }).then(r => r.json())
    .then(r => {
      setResultString(handleBold(r.code, r.bold, r.original));
       
      setLanguageM(r.lang)
      console.log(r)
       
    }) 
    .catch(e => console.log(e))

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    
    handleFetch("submit");
    setFirstSubmit(x => x+1);
     
     


  }

  return (
    <div className="App">
      <div className='formContainer'>
      <form onSubmit={handleSubmit}>
          <div className='formItems'>
          <div className='check' dangerouslySetInnerHTML={{__html: resultString}} />
          <input required type="text" value={textValue} onChange={handleChange}  /> 
          <div>{languageM}</div>
          <div className='buttonContainer'>
          <button type="submit">Проверить</button>
          </div>
          </div>
           
          
        </form>
      </div>

      <HistoryM messages={messages} />
         
         
       
    </div>
  );
}

export default App;
