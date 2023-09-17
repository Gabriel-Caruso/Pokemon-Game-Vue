import pokemonApi from "@/api/pokemonApi"

const getPokemons = () => {
    //Son 649 pokemon con imágenes de .svg
    const pokemonsArr = Array.from(Array(649))
    return pokemonsArr.map((_, index ) => index + 1)
}

const getPokemonOptions = async () => {
    //Lógica para randomizar los 649 elementos del array
    const mixedPokemons = getPokemons()
                            .sort( () => Math.random() -0.5 )

    //Quedarse con los 4 primeros enviándolo como argumento a getPokemonNames
    const pokemons = await getPokemonNames( mixedPokemons.splice(0,4) )
    return pokemons
}

const getPokemonNames = async ( [pkm1, pkm2, pkm3, pkm4] = [] ) => {

    const promisesArr = [
        pokemonApi.get(`/${ pkm1 }`),
        pokemonApi.get(`/${ pkm2 }`),
        pokemonApi.get(`/${ pkm3 }`),
        pokemonApi.get(`/${ pkm4 }`),
    ]
    const [p1,p2,p3,p4] = await Promise.all( promisesArr )
    return [
        {name: p1.data.name, id: p1.data.id},
        {name: p2.data.name, id: p2.data.id},
        {name: p3.data.name, id: p3.data.id},
        {name: p4.data.name, id: p4.data.id},
    ]

}

export default getPokemonOptions