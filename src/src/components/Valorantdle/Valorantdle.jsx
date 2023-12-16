import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from "react";
import './Valorantdle.css';

export default function Valorantdle(props) {
    // states
    const [agents, setAgents] = useState(props.agentsData)
    const [randomAgent] = useState(props.agentsData[Math.floor(Math.random() * props.agentsData.length)])
    const [guess, setGuess] = useState({ guess: '' })
    const [guessedAgents, setGuessedAgents] = useState([])
    const [agentsListVisibility, setAgentsListVisibility] = useState(false)
    const [guessListVisibility, setGuessListVisibility] = useState(false)
    const [guessCounter, setGuessCounter] = useState(0)
    const [guessedRight, setGuessedRight] = useState(false)
    const [guessedRightText, setGuessedRightText] = useState("")

    // ref
    const agentInputRef = useRef(null)
    const guessedRightRef = useRef(null)

    // helper consts
    const extraData = {
        "Gekko": ["Masculino", "EUA"],
        "Fade": ["Feminino", "Turquia"],
        "Breach": ["Masculino", "Suíça"],
        "Deadlock": ["Feminino", "Noruega"],
        "Raze": ["Feminino", "Brasil"],
        "Chamber": ["Masculino", "França"],
        "KAY/O": ["Masculino", "Terra alternativa"],
        "Skye": ["Feminino", "Austrália"],
        "Cypher": ["Masculino", "Marrocos"],
        "Sova": ["Masculino", "Rússia"],
        "Killjoy": ["Feminino", "Alemanha"],
        "Harbor": ["Masculino", "India"],
        "Viper": ["Feminino", "EUA"],
        "Phoenix": ["Masculino", "Reino Unido"],
        "Astra": ["Feminino", "Gana"],
        "Brimstone": ["Masculino", "EUA"],
        "Iso": ["Masculino", "China"],
        "Neon": ["Feminino", "Filipinas"],
        "Yoru": ["Masculino", "Japão"],
        "Sage": ["Feminino", "China"],
        "Reyna": ["Feminino", "México"],
        "Omen": ["Masculino", "Desconhecido"],
        "Jett": ["Feminino", "Coreia do Sul"]
    }

    const agentsBackgroundColors = {
        "Gekko": "#C7F458",
        "Fade": "#5589BD",
        "Breach": "#B04621",
        "Deadlock": "#BCC2FF",
        "Raze": "#FEAC45",
        "Chamber": "#F1C368",
        "KAY/O": "#1A1E4B",
        "Skye": "#94E789",
        "Cypher": "#ACADAD",
        "Sova": "#082652",
        "Killjoy": "#FFC300",
        "Harbor": "#136C6B",
        "Viper": "#347334",
        "Phoenix": "#E58346",
        "Astra": "#5210C6",
        "Brimstone": "#624637",
        "Iso": "#3D0FD4",
        "Neon": "#2C4799",
        "Yoru": "#3B37A7",
        "Sage": "#7BFEDE",
        "Reyna": "#C44D9F",
        "Omen": "#4F53AF",
        "Jett": "#90E3FD"
    }

    const guessedRightStyle = {
        background: "#0BE23E",
        color: "#ffffff"
    }

    const guessedWrongStyle = {
        background: "#E8130F",
        color: "#ffffff"
    }

    // useEffect hook

    useEffect(() => {
        if (guessedRight && guessedRightRef.current) {
            setGuessedRightText(guessCounter == 1 ? "Caramba! De primeira!" : 
                                guessCounter > 1 && guessCounter <= 4 ? "Gg ez!" : 
                                guessCounter > 4 && guessCounter <= 10 ? "Você foi bem!" :
                                guessCounter > 10 && guessCounter <= 17 ? "Nem bom, nem ruim, apenas na média!" :
                                guessCounter > 17 && guessCounter <= 22 ? "No limite hein!" : "Chutando todos é fácil!")

            const timeoutId = setTimeout(() => {
                guessedRightRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [guessedRight]);

    // helper functions
    function handleGuess(agent) {
        if (!guessListVisibility) setGuessListVisibility(true)
        setAgentsListVisibility(false)
        setGuessedAgents([agent, ...guessedAgents])
        setAgents(agents.filter(item => item !== agent))
        setGuessCounter(guessCounter+1)
        agentInputRef.current.value = ""
    }

    const handleGuessChange = (e) => {
        setAgentsListVisibility(e.target.value === "" ? false : true)
        setGuess(e.target.value)
    }

    function renderData() {
        const filteredAgents = agents.filter(agent => agent.displayName.toLowerCase().startsWith(guess.toLowerCase()))

        if (filteredAgents.length === 0) {
            return (
                <li
                    style={{ cursor: 'default' }}
                    className='guessCard'>
                    Nenhum agente disponível
                </li>
            )
        }

        return filteredAgents.map((agent) => (
            <li
                key={agent.displayName}
                className='guessCard'
                onClick={() => handleGuess(agent)}
            >
                <img
                    src={agent.displayIcon}
                    alt={agent.displayName}
                    className='agentIcon'
                    style={{ background: agentsBackgroundColors[agent.displayName] }}
                />
                <span>{agent.displayName}</span>
            </li>
        ))
    }

    return (
        <>
            <div className='content'>
                <div className='guess-form'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="300" height="300" viewBox="0 0 50 50">
                        <path fill="#E83B49" d="M4.781 6.375C4.515 6.044 4.067 5.916 3.669 6.057 3.268 6.197 3 6.575 3 7v18c0 .232.081.457.228.636l14 17C17.418 42.866 17.701 43 18 43h14c.384 0 .735-.221.901-.566.167-.347.12-.758-.121-1.059L4.781 6.375zM46.336 7.059c-.396-.146-.842-.02-1.11.309l-18 22c-.245.299-.295.712-.13 1.062C27.262 30.777 27.614 31 28 31h14c.304 0 .591-.138.781-.375l4-5C46.923 25.447 47 25.228 47 25V8C47 7.577 46.734 7.2 46.336 7.059z"></path>
                    </svg>
                    <h1>Adivinhe o agente de Valorant!</h1>
                    <input
                        ref={agentInputRef}
                        className='guessAgentInput'
                        type='text'
                        onChange={handleGuessChange}
                        placeholder='Digite o nome do agente' disabled={guessedRight}
                    />
                    {agentsListVisibility &&
                        <ul className='guessList'>
                            {renderData()}
                        </ul>
                    }
                    {guessListVisibility &&
                        <>
                            <table className='guessAgentsTable'>
                                <thead className='guessAgentsTableHead'>
                                    <tr>
                                        <th>Agente</th>
                                        <th>Gênero</th>
                                        <th>País</th>
                                        <th>Função</th>
                                    </tr>
                                </thead>
                                <tbody className='guessAgentsTableBody'>
                                    {guessedAgents.map((agent) => {
                                        if (randomAgent === agent) {
                                            if (!guessedRight) setGuessedRight(true);
                                            return (
                                                <tr key={agent.displayName} className='guessedAgent'>
                                                    <td style={{ background: agentsBackgroundColors[agent.displayName] }}>
                                                        <img
                                                            src={agent.displayIcon}
                                                            alt={agent.displayName}
                                                            className='guessedAgentIcon'
                                                        />
                                                    </td>
                                                    <td style={guessedRightStyle}>
                                                        {extraData[agent.displayName][0]}
                                                    </td>
                                                    <td style={guessedRightStyle}>
                                                        {extraData[agent.displayName][1]}
                                                    </td>
                                                    <td style={guessedRightStyle}>
                                                        {agent.role.displayName}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        return (
                                            <tr key={agent.displayName} className='guessedAgent'>
                                                <td style={{ background: agentsBackgroundColors[agent.displayName] }}>
                                                    <img
                                                        src={agent.displayIcon}
                                                        alt={agent.displayName}
                                                        className='guessedAgentIcon'
                                                    />
                                                </td>
                                                <td style={
                                                    extraData[agent.displayName][0] === extraData[randomAgent.displayName][0] ?
                                                        guessedRightStyle : guessedWrongStyle
                                                }>
                                                    {extraData[agent.displayName][0]}
                                                </td>
                                                <td style={
                                                    extraData[agent.displayName][1] === extraData[randomAgent.displayName][1] ?
                                                        guessedRightStyle : guessedWrongStyle
                                                }>
                                                    {extraData[agent.displayName][1]}
                                                </td>
                                                <td style={
                                                    agent.role.displayName === randomAgent.role.displayName ?
                                                        guessedRightStyle : guessedWrongStyle
                                                }>
                                                    {agent.role.displayName}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>   
                            </table>
                            {guessedRight &&
                                <div
                                    className='guessedRightDiv'
                                    ref={guessedRightRef}
                                >
                                    <h1>{guessedRightText}</h1>
                                    <h2>Número de tentativas: <span className='attemptCount'>{guessCounter}</span></h2>
                                    <div className='guessedRightInfosDiv'>
                                        <img
                                            src={randomAgent.displayIcon}
                                            alt={randomAgent.displayName}
                                            style={{ background: agentsBackgroundColors[randomAgent.displayName] }}
                                        />
                                        <section>
                                            <span>Você acertou</span>
                                            <span>{randomAgent.displayName}</span>
                                        </section>
                                    </div>
                                    <button className='restartBtn' onClick={() => {location.reload()}}>
                                        Gerar novo agente
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw">
                                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                                            <path d="M3 3v5h5"/>
                                        </svg>
                                    </button>
                                </div>
                            }
                        </>
                    }
                    <div className='helpPopup'>
                        <section>
                            <div className='square' style={{background: "#0BE23E"}}></div>
                            <span>Correto</span>
                        </section>
                        <section>
                            <div className='square' style={{background: "#E8130F"}}></div>
                            <span>Incorreto</span>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

Valorantdle.propTypes = {
    agentsData: PropTypes.array.isRequired
};