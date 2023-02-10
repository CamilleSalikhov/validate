import './App.css';
import HistoryM from './HistoryM'; 
import { useState, useEffect } from 'react';

function App() {

  const [textValue, setTextValue] = useState('');
  /* const [codeValue, setCodeValue] = useState('');
  const [boldValue, setBoldValue] = useState(''); */
  const [resultString, setResultString] = useState('');
  const [messages, setMessages] = useState([])

  const handleChange = (e) => {
    setTextValue(e.target.value);
     ;    
  }

  useEffect(() => {
    handleGet();
  }, [])



  useEffect(() => {
    handleFetch('validate')
  }, [textValue])



  const handleBold = (code, bold, original) => {
     
    /* document.querySelector('input').style.color = 'transparent';
    let span = document.querySelector('span')   ;
    span.innerHTML = 
        '<b>' + 
        document.querySelector('input').value.substr(0, 3) + 
        '</b>' + 
        document.querySelector('input').value.substr(3); */
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
       
    }) 
    .catch(e => console.log(e))

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    /* const result = textValue.split('');
    console.log(JSON.stringify(result)); */
    handleFetch("submit");
    handleGet();

    /* fetch("http://validate.com/validate", {
        method: 'POST',
        header: {
             'Content-Type': 'application/json' 
        },
        body : JSON.stringify({
          value : result,
          type:"submit"
        })

    }).then(r => r.json())
    .then(r => {
      setBoldValue(r.bold);
      setCodeValue(r.code);
      console.log(r)
    }) 
    .catch(e => console.log(e)) */ 


  }

  return (
    <div className="App">
      <div className='formContainer'>
      <form onSubmit={handleSubmit}>
          <div className='formItems'>
            
          <input type="text" value={textValue} onChange={handleChange}  /> 
          
          <span dangerouslySetInnerHTML={{__html: resultString}} />
          <button type="submit">Проверить</button>
          </div>
           
          
        </form>
      </div>

      <HistoryM messages={messages} />
         
         
       
    </div>
  );
}

export default App;
