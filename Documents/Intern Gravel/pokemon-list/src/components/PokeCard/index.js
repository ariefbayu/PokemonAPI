import React, { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import axios from "axios";
import "./style.css";
import PokeModal from "../PokeModal";

const UNDEFINED_POKEMON_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
const PokeCard = (props) => {
    const [imgURL, setImgURL] = useState(UNDEFINED_POKEMON_URL)
    const [isValid, setIsValid] = useState(false)
    const [modalShow, setModalShow] = useState(false);


    useEffect(() => {
        checkPokemon()
    },[props.pokemon])

    const loadImage = async() =>{
        await axios.get(props.pokemon.url)
        .then((response) => {
            if(response.data.sprites.front_default){
                setImgURL(response.data.sprites.front_default);
            }
        }).catch(err => {
            console.error(err);
        });;
    }
    
    const checkPokemon = () => {  //undifined at last page
        if (props.pokemon !== undefined){
            setIsValid(true)
            loadImage()
        }
    }

    const titleCase = (name) => {
        const words = name.split("-");
        let fixedName = ""
        words.map((word)=> {
            word = word.charAt(0).toUpperCase() + word.slice(1)
            fixedName = fixedName.concat(" ", word)
        })
        return fixedName
    }

    return (
        <div style={props.rowStyle}>
            {isValid? //to prevent incorect index
            <Card className="pokeCard" onClick={() => setModalShow(true)}>
            <Card.Img variant="top" src={imgURL} width="100" className="pokeImg" />
            <Card.Body>
                <Card.Title className="pokeName">{titleCase(props.pokemon.name)}</Card.Title>
            </Card.Body>
            </Card>
            : <></>}
            {modalShow? //to prevent to much render on modal
                <PokeModal show={modalShow} onHide={() => setModalShow(false)} pokemon={props.pokemon}/>
            :   <></>
            }
        </div>
    )
}
export default PokeCard;