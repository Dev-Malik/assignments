import './style.css'

export function CreateCard({name,description,interests,handles}){
    return <div className='card'>
        < div className='card-content'>
            <h1 className='name'>{name}</h1>
            <p>{description}</p>
            < div className='card-interest'>
                <h2>Interests</h2>
                <ul>
                    {interests.map(interest =>(
                        <li key={interest}>{interest}</li>
                    ))}

                </ul>
            </div>
            <div className='handle'>
                {handles.linkedin && (
                    <a href={handles.linkedin} target="_blank"><button>LinkedIn</button></a>
                )}
                {handles.insta && (
                    <a href={handles.insta} target="_blank"><button>Instagram</button></a>
                )}
            </div>
        </div>

    </div>
}