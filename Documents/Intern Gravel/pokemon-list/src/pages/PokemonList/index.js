import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import PokeCard from "../../components/PokeCard";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";
import axios from "axios";
import { Pagination } from "@mui/material";
import Spinner from 'react-bootstrap/Spinner';
import "./style.css";

const PokemonList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [listpokemon, setListPokemon] = useState({});

    useEffect(() => {
        loadPokemon()
    }, []);

    useEffect(() => {
        loadPokemon()
    }, [page]);

    const loadPokemon = () =>{
        axios.get("https://pokeapi.co/api/v2/pokemon/?limit=12&offset="+(page-1)*12)
        .then((response) => {
            setListPokemon(response.data);
            setIsLoading(false)
        }).catch(err => {
            console.error(err);
        });;
        
    }

    const handleChangePage = (event, value) => {
        if ( value !== page){
            setPage(value)
            setIsLoading(true)
        }

    }

    return(
        <div className="base">
            {isLoading ? <Spinner animation="grow" variant="danger" className="loading"/> : 
            <div className="container">
                <div className="title">
                    <h1>Search Your Pokemon !</h1>
                </div>
                <div className="pokemon-list">
                    <AutoSizer>
                    {({ height, width }) => (
                        <Grid
                        style={{
                            
                        }}
                        className="grid"
                        height={height > 500 ? height : 500}
                        width={width}
                        columnCount={12/4} //12 used for column consistency; 4 used to create 3 column
                        columnWidth={420}
                        rowCount= {Math.ceil(Object.values(listpokemon.results).length/3)} //3 used to create 4 row
                        rowHeight={300}
                        >
                            {({ rowIndex, columnIndex, style }) => (
                                <PokeCard
                                index={columnIndex + rowIndex * 3}
                                rowStyle={style}
                                pokemon={listpokemon.results[columnIndex + rowIndex * 3]} //to address each pokemon in order
                                />
                            )}
                        </Grid>
                    )}
                    </AutoSizer> 
                    </div>
                    <div className="pagination">
                        <Pagination color="error" count={Math.ceil(listpokemon.count/12)} defaultPage={page} boundaryCount={2} 
                        onChange={handleChangePage} />
                        {/* <input class="form-control form-control-sm" type="text" placeholder="enter page" aria-label=".form-control-sm example"/> */}
                    </div>
            </div>
            }
        </div>
        
    )
}
export default observer(PokemonList);