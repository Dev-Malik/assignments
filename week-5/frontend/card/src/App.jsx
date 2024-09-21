import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateCard } from './components/CreateCard'
import { CardInput } from './components/CardInput'

function App() {

    const [cards,setCards] = useState([]);
    const [ischanged,setChange] = useState(0);
    useEffect(() => {
        
        axios.get('http://localhost:3000/cards')
            .then(response => {
                
                setCards(response.data);
               
            })
            
    }, [ischanged]);

     
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
        const [interests, setInterests] = useState('');
        const [linkedin, setLinkedin] = useState('');
        const [insta, setInstagram] = useState('');
    
        
        const handleSubmit = async () => {
            
            const interestsArray = interests.split(',').map(i => i.trim());
    
             
                const response = await axios.post('http://localhost:3000/card', {
                    name,
                    description,
                    interests: interestsArray,
                    handles: {
                        linkedin,
                        insta
                    }
                },{
                    headers: {
                        'Content-Type': 'application/json'
                    }});
                const data = await response.data;
                
    
                
                setName('');
                setDescription('');
                setInterests('');
                setLinkedin('');
                setInstagram('');
                setChange(ischanged+1);
            
        };
       
    
    
    return (
        <div>
           
           <div>
            <input style={{
                padding:10,
                margin:10
            }} type="text" placeholder="name" onChange={(e)=>{
                setName(e.target.value)
            }} /> <br />
    
    
            <input style={{
                padding:10,
                margin:10
            }} type="text" placeholder="description" onChange={(e)=>{
                setDescription(e.target.value)
            }}/><br />
    
    
            <input style={{
                padding:10,
                margin:10
            }} type="text" placeholder="Interest (use ,)" onChange={(e)=>{
                setInterests(e.target.value)
            }} /><br />
    
    
            <input style={{
                padding:10,
                margin:10
            }} type="text" placeholder="linkedin url" onChange={(e)=>{
                setLinkedin(e.target.value)
            }} /><br />
    
    
            <input style={{
                padding:10,
                margin:10
            }} type="text" placeholder="insta url" onChange={(e)=>{
                setInstagram(e.target.value)
            }} /><br />
            <button  style={{
                padding:10,
                margin:10
            }} onClick={handleSubmit}>Add a card</button>
        </div> 

            
            <div>
                {Array.isArray(cards) && cards.map((card) => (
                    <CreateCard 
                        key = {card._id}
                        name={card.name}
                        description={card.description}
                        interests={card.interests}
                        handles={card.handles}
                    />
                ))}
            </div>
        </div>
    );

  
  
}

export default App
