import {useState} from 'react';
import axios from 'axios';

export function CardInput({ onAddCard }){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [interests, setInterests] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [instagram, setInstagram] = useState('');

    
    const handleSubmit = async () => {
        
        const interestsArray = interests.split(',').map(i => i.trim());

         
            const response = await axios.post('http://localhost:3000/card', {
                name,
                description,
                interests: interestsArray,
                handles: {
                    linkedin,
                    instagram
                }
            },{
                headers: {
                    'Content-Type': 'application/json'
                }});
            const data = await response.data;
            onAddCard(data);

            
            setName('');
            setDescription('');
            setInterests('');
            setLinkedin('');
            setInstagram('');
        
    };
    return <div>
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
}