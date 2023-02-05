import React, { useEffect, useState } from "react"
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { GiFist, GiThorFist, GiHeartPlus, GiWingfoot,
    GiCheckedShield, GiShieldEchoes} from "react-icons/gi";
import "./style.css";

const UNDEFINED_POKEMON_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
const PokeModal = (props) => {
    const [types, setTypes] = useState([]);
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [abilities, setAbilities] = useState([]);
    const [moves, setMoves] = useState([]);
    const [name, setName] = useState("");
    const [imgURL, setImgURL] = useState(UNDEFINED_POKEMON_URL);
    const [health, setHealth] = useState(0)
    const [attack, setAttack] = useState(0)
    const [spAttack, setSpAttack] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [defense, setDefense] = useState(0)
    const [spDefense, setSpDefense] = useState(0)
    

    useEffect(() => {
        loadPokemonData()
    },[props.pokemon])

    const loadPokemonData = async() =>{
        await axios.get(props.pokemon.url)
        .then((response) => {
            if(response.data.sprites.front_default){
                setImgURL(response.data.sprites.front_default);
            }
           setTypes(response.data.types);
           setHealth(response.data.stats[0].base_stat); //stats index 0 is hp
           setAttack(response.data.stats[1].base_stat); //stats index 1 is attack
           setDefense(response.data.stats[2].base_stat);//stats index 2 is defense
           setSpAttack(response.data.stats[3].base_stat); //stats index 3 is special attack
           setSpDefense(response.data.stats[4].base_stat); //stats index 4 is special defense
           setSpeed(response.data.stats[5].base_stat); //stats index 5 is speed
           setAbilities(response.data.abilities);
           setWeight(response.data.weight);
           setHeight(response.data.height);
           setMoves(response.data.moves);
           setName(response.data.name);

        }).catch(err => {
            console.error(err);
        });;
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

    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="baseModal"
        >
            <Modal.Header closeButton className="modalHeader" >
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>{titleCase(name)}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
                <div className="row BasicInfo">
                    <div className="col-lg-4 col-6 containerImg">
                        <img src={imgURL} className="pokemonLargeImg" alt="pokemon"/>
                    </div>
                    <div className="col-lg-7">
                        <h3>Information</h3>
                        <div className="row">
                            <h5 className="col-lg-3 col-3 ">Type </h5>
                            <h5 className="col-1">:</h5>
                            <h5 className="col">{types.map((type) => titleCase(type.type.name)).toString()}</h5>
                        </div>
                        <div className="row">
                            <h5 className="col-3">Weight </h5>
                            <h5 className="col-1">:</h5>
                            <h5 className="col-5">{weight}</h5>
                        </div>
                        <div className="row">
                            <h5 className="col-3">Height </h5>
                            <h5 className="col-1">:</h5>
                            <h5 className="col-5">{height}</h5>
                        </div>
                        <div className="row">
                            <h5 className="col-3">Abilities </h5>
                            <h5 className="col-1">:</h5>
                            <h5 className="col">{abilities.map((ability) => titleCase(ability.ability.name)).toString()}</h5>
                        </div>
                    </div>

                </div>
                <div className="row mt-2 DetailInfo">
                     <div className="row">
                        <h5 className="col-3">Move </h5>
                        <h5 className="col-1">:</h5>
                        <p className="col">{moves.map((move) => titleCase(move.move.name)).toString()}</p>
                    </div>
                    <div className="row">
                        <h5 className="col-3">Stats </h5>
                        <h5 className="col-1">:</h5>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-6 mb-2">
                                    <div className="d-flex flex-row">
                                        <GiHeartPlus size={50} color="rgb(0, 182, 9)"/>
                                        <h2 className="stat">{health}</h2> 
                                    </div>
                                    <p>Health</p>
                                </div>
                                <div className="col-6 mb-2">
                                    <div className="d-flex flex-row">
                                        <GiWingfoot size={50} color="rgb(219, 151, 15)"/>
                                        <h2 className="stat">{speed}</h2>
                                    </div>
                                    <p>Speed</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 mb-2">
                                    <div className="d-flex flex-row">
                                        <GiFist size={50} color="rgb(239, 42, 42)"/>
                                        <h2 className="stat">{attack}</h2>
                                    </div>
                                    <p>Attack</p>
                                </div>
                                <div className="col-6 mb-2">
                                    <div className="d-flex flex-row">
                                        <GiThorFist size={50} color="rgb(15, 40, 231)"/>
                                        <h2 className="stat">{spAttack}</h2>
                                    </div>
                                    <p>Sp. Attack</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 mb-2">
                                    <div className="d-flex flex-row">
                                        <GiCheckedShield size={50} color="rgb(0, 185, 173)"/>
                                        <h2 className="stat">{defense}</h2>
                                    </div>
                                    <p>Defense</p>
                                </div>
                                <div className="col-6 mb-2">
                                    <div className="d-flex flex-row">
                                        <GiShieldEchoes size={50} color="rgb(162, 21, 201)"/>
                                        <h2 className="stat">{spDefense}</h2>
                                    </div>
                                    <p>Sp. Defense</p>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default PokeModal;